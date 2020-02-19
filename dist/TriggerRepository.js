"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TriggerRepository = /** @class */ (function () {
    function TriggerRepository() {
        /* END OF STATIC STUFF */
        this.triggerMap = {};
    }
    TriggerRepository.getInstance = function () {
        if (!TriggerRepository.instance) {
            TriggerRepository.instance = new TriggerRepository();
        }
        return TriggerRepository.instance;
    };
    TriggerRepository.prototype.addGuild = function (guildId) {
        this.triggerMap[guildId] = {};
    };
    TriggerRepository.prototype.getTriggersForGuild = function (guildId) {
        return this.triggerMap[guildId];
    };
    TriggerRepository.prototype.addTriggerForGuild = function (guildId, trigger) {
        var triggerType = trigger.triggerType, action = trigger.action;
        this.triggerMap[guildId][triggerType] = action;
    };
    return TriggerRepository;
}());
exports.default = TriggerRepository;
//# sourceMappingURL=TriggerRepository.js.map