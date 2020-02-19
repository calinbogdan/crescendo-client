"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordClientProvider_1 = require("../DiscordClientProvider");
exports.default = (function (message, _a) {
    var channelId = _a.channelId, text = _a.text;
    var client = DiscordClientProvider_1.default.getClient();
    var guild = client.guilds.get(message.guild.id);
    var textChannel = guild.channels.get(channelId);
    textChannel.send(text);
});
//# sourceMappingURL=sendTextChannelMessage.js.map