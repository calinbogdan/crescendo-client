"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DiscordClientProvider_1 = require("../DiscordClientProvider");
var router = express_1.Router();
router.get("/", function (req, res) {
    console.log(DiscordClientProvider_1.default.getClient().guilds);
    res.send(DiscordClientProvider_1.default.getClient().guilds.map(function (guild) { return guild.id; }));
});
exports.default = router;
//# sourceMappingURL=guildRoutes.js.map