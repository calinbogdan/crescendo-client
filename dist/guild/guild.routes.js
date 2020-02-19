"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DiscordClientProvider_1 = require("../DiscordClientProvider");
var trigger_routes_1 = require("./trigger/trigger.routes");
var router = express_1.Router();
router.use("/:guildId/triggers", trigger_routes_1.default);
router.get("/", function (req, res) {
    res.send(DiscordClientProvider_1.default.getClient().guilds.map(function (guild) { return ({
        id: guild.id,
        channels: guild.channels.map(function (channel) { return ({
            id: channel.id,
            name: channel.name
        }); })
    }); }));
});
exports.default = router;
//# sourceMappingURL=guild.routes.js.map