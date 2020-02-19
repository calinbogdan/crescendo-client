import { Router } from "express";
import TriggerRepository from "../../TriggerRepository";

const router = Router({
    mergeParams: true
});

router.get("/", (req, res) => {
    const guildId = req.params.guildId;
    res.send(TriggerRepository.getInstance().triggerMap[guildId]);
})

router.post("/", (req, res) => {
    const guildId = req.params.guildId;
    const trigger = req.body;

    const triggerRepo = TriggerRepository.getInstance();

    const triggersArrayForSaidTrigger = triggerRepo.triggerMap[guildId][trigger.triggerType];

    if (!triggersArrayForSaidTrigger) {
        triggerRepo.triggerMap[guildId][trigger.triggerType] = [trigger];
    } else {
        triggersArrayForSaidTrigger.push(trigger);
    }

    res.sendStatus(201);
});

export default router;