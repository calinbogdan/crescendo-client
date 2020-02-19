"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TriggerRepository_1 = require("../../TriggerRepository");
var router = express_1.Router({
    mergeParams: true
});
router.get("/", function (req, res) {
    var guildId = req.params.guildId;
    res.send(TriggerRepository_1.default.getInstance().triggerMap[guildId]);
});
router.post("/", function (req, res) {
    var guildId = req.params.guildId;
    var trigger = req.body;
    var triggerRepo = TriggerRepository_1.default.getInstance();
    var triggersArrayForSaidTrigger = triggerRepo.triggerMap[guildId][trigger.triggerType];
    if (!triggersArrayForSaidTrigger) {
        triggerRepo.triggerMap[guildId][trigger.triggerType] = [trigger];
    }
    else {
        triggersArrayForSaidTrigger.push(trigger);
    }
    res.sendStatus(201);
});
exports.default = router;
//# sourceMappingURL=trigger.routes.js.map