import express from 'express';
const app = express();
import { secret } from "./config.json";
import { Client } from 'discord.js';

import * as http from 'http';
const server = http.createServer(app);

import SocketServer from 'socket.io';
const io = SocketServer(server);
const socketRooms = {};

const voiceChannelStatusRoom = io.of('/channel-status');


function createRoomForChannel(channelId) {
    socketRooms[channelId] = io.of(`/${channelId}`);
}

function deleteRoomForChannel(channelId) {
    socketRooms[channelId] = null;
    delete socketRooms[channelId];
}

const client = new Client();

client.once('ready', () => console.log('Discord client connected to gateway!'));
client.login(secret).then(() => {
    client.channels.fetch(channelId).then(vc => vc.join());
});

/* START OF VOICE STATE UPDATE HANDLERS */
function onBotVoiceChannelStateChanged (oldState, newState) {
    if (!oldState.channelID) {
        // bot joined a voice channel
        createRoomForChannel(newState.channelID);
    } else if (!newState.channelID) {
        // bot left a voice channel
        deleteRoomForChannel(oldState.channelID);
    } else if (oldState.channelID !== newState.channelID) {
        // bot changed voice channel
        createRoomForChannel(newState.channelID);
        deleteRoomForChannel(oldState.channelID);
    }
}

function onGuildMemberJoinVoiceChannel (guildMember, channelId, guildId) {
    voiceChannelStatusRoom.emit('CHANNEL_JOIN', {
        channelId,
        guildId,
        memberId: guildMember.id
    });
}

function onGuildMemberLeaveVoiceChannel (guildMember, channelId, guildId) {
    voiceChannelStatusRoom.emit('CHANNEL_LEAVE', {
        channelId,
        guildId,
        memberId: guildMember.id
    });
}

function onGuildMemberSwitchVoiceChannel (guildMember) {
    voiceChannelStatusRoom.emit('CHANNEL_SWITCH', { // might be subject of removal?
        channelId,
        guildId,
        memberId: guildMember.id
    });
}

/* 
*   This function will get called when a user joins / changes / leaves the channel
*/
function onMemberVoiceChannelStateChanged (oldState, newState) {
    if (!oldState.channelID) {
        onGuildMemberJoinVoiceChannel(newState.member, newState.channel.id, newState.guild.id);
    } else if (!newState.channelID) { 
        onGuildMemberLeaveVoiceChannel(newState.member);
    } else if (oldState.channelID !== newState.channelID) {
        onGuildMemberSwitchVoiceChannel(newState.member);
    }
}

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.member.user.id === client.user.id) {
        onBotVoiceChannelStateChanged(oldState, newState);
    } else {
        onMemberVoiceChannelStateChanged(oldState, newState);
    }
});


/** END OF VOICE STATE UPDATE HANDLERS */

client.on('message', message => {
    if (message.content === "join") {
        message.member.voice.channel?.join();
    }
});

const SONG_PATH = `${__dirname}/airhorn.opus`;
console.log(`Song path is ${SONG_PATH}`);

let streamDispatcher = null;
let voiceChannel = null;
let voiceConnection = null;

const channelId = "679035440141041668";

io.on('connection', socket => {
    socket.on('join', async () => {
        voiceChannel = await client.channels.fetch(channelId);
        voiceConnection = await voiceChannel.join();
        console.log(`Connected to channel ${channelId}`)
    });
    
    socket.on('play', async () => {
        streamDispatcher = voiceConnection.play(SONG_PATH, {
            bitrate: 'auto'
        });     
    });
});

app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.set('trust proxy', true);

server.listen(80, "0.0.0.0", () => console.log('Server listening on port 3001'));




