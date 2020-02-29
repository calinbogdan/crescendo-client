import express from 'express';
import cors from 'cors';
const app = express();
import "reflect-metadata";

import * as http from 'http';
const httpServer = http.createServer(app);

import guildRoutes from './guild/guild.routes';
import DiscordClientProvider from "./DiscordClientProvider.js";
import { createConnection } from 'typeorm';
import entitiesProxy from './entitiesProxy';

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "druidpath",
    entities: entitiesProxy,
    synchronize: true
});

app.use(express.json());
app.use(cors());

app.use('/guilds', guildRoutes);

(async () => {
    await DiscordClientProvider.init();
    httpServer.listen(3001, () => console.log('Server listening on port 3000'));
})();


