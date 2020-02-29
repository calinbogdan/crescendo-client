import { Client, DMChannel } from "discord.js";
import { secret } from "./config.json";
import sendTextChannelMessage from "./actions/sendTextChannelMessage.js";
import onGuildTextChannelMessage from "./onGuildTextChannelMessage.js";
import { getConnection, getRepository, createQueryBuilder } from "typeorm";
import { Guild } from "./guild/guild.entity.js";
import TriggersCache from "./TriggersCache.js";
import { Trigger } from "./guild/trigger/trigger.entity.js";

export default class DiscordClientProvider {
    private static instance: Client;

    public static getClient() {
        if (!DiscordClientProvider.instance) {
            DiscordClientProvider.init();
        }
        return DiscordClientProvider.instance;
    }

    public static async init() {
        DiscordClientProvider.instance = new Client();
        const client = DiscordClientProvider.instance;
        
        client.on('ready', async () => {
            console.log(`Logged in as ${client.user.tag}`);
            console.log('These are the servers that I am serving: ', client.guilds.map(g => g.name));
            
            client.guilds.forEach(guild => {
                TriggersCache.instance.guilds[guild.id] = {
                    triggers: {}
                };
            });

            const guildIds = client.guilds.map(guild => guild.id);

            const guilds = await createQueryBuilder()
                .select("guild").from(Guild, "guild")
                .leftJoinAndSelect("guild.triggers", "trigger")
                .where("guild.discordId IN (:...guildIds)", { guildIds })
                .getMany();
            
            guilds.forEach(guild => {
                guild.triggers.forEach(trigger => {
                    if (!TriggersCache.instance.guilds[guild.discordId].triggers[trigger.type]) {
                        TriggersCache.instance.guilds[guild.discordId].triggers[trigger.type] = [];
                    }
                    TriggersCache.instance.guilds[guild.discordId].triggers[trigger.type].push(trigger.payload);
                });
            });

            const triggersCacheGuildsObj = TriggersCache.instance.guilds;
            const caca = triggersCacheGuildsObj;
        });
        
        client.on('message', message => {
            if (!message.author.bot) {
                if (message.channel instanceof DMChannel) {
                    console.log("Sorry! Feature yet unavailable.");
                } else {
                    onGuildTextChannelMessage(message);
                }
            }
        });
        
        // DO NOT TOUCH UNDER THIS
        client.on("guildCreate", ({ id }) => {
            const guild = new Guild();
            guild.discordId = id;

            getConnection().getRepository(Guild).save(guild);
        });

        client.on("guildDelete", ({ id }) => {
            getConnection().getRepository(Guild).delete({ discordId: id });
        })

        
        return client.login(secret);
    }

    

    protected constructor() {}
};