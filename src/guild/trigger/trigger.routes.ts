import { Router } from "express";
import { getConnection, getRepository } from "typeorm";
import { Trigger } from "./trigger.entity";
import { Guild } from "../guild.entity";
import TriggersCache from "../../TriggersCache";

const router = Router({
    mergeParams: true
});

router.get("/", async (req, res) => {
    const guildId = req.params.guildId;
    res.send(await getRepository(Guild).findOne({ discordId: guildId }, { relations: ["triggers"] }));
    
})

router.post("/", async (req, res) => {
    const guildId = req.params.guildId;
    const { type, payload } = req.body;    

    const guildRepo = getRepository(Guild);
    const guild = await guildRepo.findOne({ discordId: guildId }, { relations: ["triggers"]});

    if (!guild) {
        return res.sendStatus(400);
    }

    const trigger = new Trigger();

    trigger.payload = payload;
    trigger.type = type;
    trigger.guild = guild;

    await getRepository(Trigger).save(trigger);

    const triggersOfCurrentType = TriggersCache.instance.guilds[guildId].triggers[type];
    if (!triggersOfCurrentType) {
        TriggersCache.instance.guilds[guildId].triggers[type] = [];
    }
    TriggersCache.instance.guilds[guildId].triggers[type].push(trigger.payload);
    res.sendStatus(201);
});

export default router;