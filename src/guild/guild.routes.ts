import { Router } from "express";
import DiscordClientProvider from "../DiscordClientProvider";

import triggerRoutes from "./trigger/trigger.routes";

const router = Router();

router.use("/:guildId/triggers", triggerRoutes);

router.get("/", (req, res) => {
    res.send(DiscordClientProvider.getClient().guilds.map(guild => ({
        id: guild.id,
        channels: guild.channels.map(channel => ({
            id: channel.id,
            name: channel.name
        }))
    })));
});

export default router;