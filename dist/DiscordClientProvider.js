"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var config_json_1 = require("./config.json");
var TriggerRepository_js_1 = require("./TriggerRepository.js");
var onGuildTextChannelMessage_js_1 = require("./onGuildTextChannelMessage.js");
var DiscordClientProvider = /** @class */ (function () {
    function DiscordClientProvider() {
    }
    DiscordClientProvider.getClient = function () {
        if (!DiscordClientProvider.instance) {
            DiscordClientProvider.init();
        }
        return DiscordClientProvider.instance;
    };
    DiscordClientProvider.init = function () {
        DiscordClientProvider.instance = new discord_js_1.Client();
        var client = DiscordClientProvider.instance;
        client.on('ready', function () {
            console.log("Logged in as " + client.user.tag);
            console.log('These are the servers that I am serving: ', client.guilds.map(function (g) { return g.name; }));
            var triggerRepo = TriggerRepository_js_1.default.getInstance();
            client.guilds.forEach(function (guild) {
                triggerRepo.triggerMap[guild.id] = {};
            });
        });
        client.on('message', function (message) {
            if (!message.author.bot) {
                if (message.channel instanceof discord_js_1.DMChannel) {
                    console.log("Sorry! Feature yet unavailable.");
                }
                else {
                    onGuildTextChannelMessage_js_1.default(message);
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
        client.login(config_json_1.secret);
    };
    return DiscordClientProvider;
}());
exports.default = DiscordClientProvider;
;
//# sourceMappingURL=DiscordClientProvider.js.map