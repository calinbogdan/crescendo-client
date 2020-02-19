"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = require("./config.json");
var express = require("express");
var app = express();
var http = require("http");
var httpServer = http.createServer(app);
var SocketIO = require("socket.io");
var SocketServer = new SocketIO(httpServer);
var mongoose = require("mongoose");
var guild_routes_1 = require("./guild/guild.routes");
var DiscordClientProvider_js_1 = require("./DiscordClientProvider.js");
mongoose.connect(config_json_1.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json());
app.use('/guilds', guild_routes_1.default);
DiscordClientProvider_js_1.default.init();
// app.post("/triggers", (req, res) => {
//     const { triggerType, action, guildId } = req.body;
//     triggerMap[guildId][triggerType] = action;
//     if ()
//     res.sendStatus(201);
// });
httpServer.listen(3001, function () { return console.log('Server listening on port 3000'); });
//# sourceMappingURL=index.js.map