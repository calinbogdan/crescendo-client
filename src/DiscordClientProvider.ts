import { Client, DMChannel } from "discord.js";
import { secret } from "./config.json";
import TriggerRepository from "./TriggerRepository.js";
import sendTextChannelMessage from "./actions/sendTextChannelMessage.js";
import onGuildTextChannelMessage from "./onGuildTextChannelMessage.js";

export default class DiscordClientProvider {
    private static instance: Client;

    public static getClient() {
        if (!DiscordClientProvider.instance) {
            DiscordClientProvider.init();
        }
        return DiscordClientProvider.instance;
    }

    public static init() {
        DiscordClientProvider.instance = new Client();
        const client = DiscordClientProvider.instance;
        
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}`);
            console.log('These are the servers that I am serving: ', client.guilds.map(g => g.name));
            
            const triggerRepo = TriggerRepository.getInstance();
            client.guilds.forEach(guild => {
                triggerRepo.triggerMap[guild.id] = {};
            });
        });
        
        client.on('message', message => {
            if (!message.author.bot) {
                if (message.channel instanceof DMChannel) {
                    console.log("Sorry! Feature yet unavailable.");
                } else {
                    onGuildTextChannelMessage(message);
                }
            }

            // if (!msg.author.bot) {
            //     const triggerRepo = TriggerRepository.getInstance();
            //     // console.log(triggerRepo.getTriggersForGuild(msg.guild.id)['message']);

            //     const { channelId, text } = triggerRepo.getTriggersForGuild(msg.guild.id)['message'];
            //     if (channelId && text) {
            //         sendTextChannelMessage(msg.guild.id, channelId, text);
            //     }

            // }
        });

        
        client.login(secret);
    }

    protected constructor() {}
};