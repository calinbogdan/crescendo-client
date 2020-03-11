"use strict";

var _express = _interopRequireDefault(require("express"));

var _config = require("./config.json");

var _discord = require("discord.js");

var http = _interopRequireWildcard(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const server = http.createServer(app);
const io = (0, _socket.default)(server);
const socketRooms = {};
const voiceChannelStatusRoom = io.of('/channel-status');

function createRoomForChannel(channelId) {
  socketRooms[channelId] = io.of(`/${channelId}`);
}

function deleteRoomForChannel(channelId) {
  socketRooms[channelId] = null;
  delete socketRooms[channelId];
}

const client = new _discord.Client();
client.once('ready', () => console.log('Discord client connected to gateway!'));
client.login(_config.secret).then(() => {
  client.channels.fetch(channelId).then(vc => vc.join());
});
/* START OF VOICE STATE UPDATE HANDLERS */

function onBotVoiceChannelStateChanged(oldState, newState) {
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

function onGuildMemberJoinVoiceChannel(guildMember, channelId, guildId) {
  voiceChannelStatusRoom.emit('CHANNEL_JOIN', {
    channelId,
    guildId,
    memberId: guildMember.id
  });
}

function onGuildMemberLeaveVoiceChannel(guildMember) {}

function onGuildMemberSwitchVoiceChannel(guildMember) {}
/* 
*   This function will get called when a user joins / changes / leaves the channel
*/


function onMemberVoiceChannelStateChanged(oldState, newState) {
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
    var _message$member$voice;

    (_message$member$voice = message.member.voice.channel) === null || _message$member$voice === void 0 ? void 0 : _message$member$voice.join();
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
    console.log(`Connected to channel ${channelId}`);
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