import { mongoUrl } from "./config.json";

import express = require('express');
const app = express();

import * as http from 'http';
const httpServer = http.createServer(app);

import * as SocketIO from 'socket.io';
const SocketServer = new SocketIO(httpServer);

import mongoose = require("mongoose");
import guildRoutes from './guild/guild.routes';
import DiscordClientProvider from "./DiscordClientProvider.js";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.use(express.json());

app.use('/guilds', guildRoutes);

DiscordClientProvider.init();

// app.post("/triggers", (req, res) => {
//     const { triggerType, action, guildId } = req.body;
//     triggerMap[guildId][triggerType] = action;

//     if ()



//     res.sendStatus(201);
// });
httpServer.listen(3001, () => console.log('Server listening on port 3000'));


