"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordClientProvider_1 = require("../DiscordClientProvider");
exports.default = (function (message, _a) {
    var text = _a.text;
    var client = DiscordClientProvider_1.default.getClient();
    client.users.get(message.author.id).send(text);
});
//# sourceMappingURL=sendDirectMessage.js.map