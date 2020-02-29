"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sendTextChannelMessage_1 = __importDefault(require("./actions/sendTextChannelMessage"));
var sendDirectMessage_1 = __importDefault(require("./actions/sendDirectMessage"));
var TriggersCache_1 = __importDefault(require("./TriggersCache"));
var eventsMap = {
    "SendTextChannelMessage": sendTextChannelMessage_1.default,
    "SendDirectMessage": sendDirectMessage_1.default
};
/**
 * If I were to phrase this like a story, I'd say that GUILD RELATED ACTIONS come here.
 */
exports.default = (function (message) {
    var _a;
    /* I know for sure it's a guild message in a text channel, then
    I should look whether there's a trigger registered for this kind of event. */
    // check if the Guild is even registered in the trigger map (we assume that we're good coders and if it is not, it means that someone hasn't paid something)
    var guildTriggerMap = TriggersCache_1.default.instance.guilds[message.guild.id].triggers;
    // check if the guild has the trigger we're looking for
    var textChannelMessageActions = (_a = guildTriggerMap) === null || _a === void 0 ? void 0 : _a.message;
    if (textChannelMessageActions) {
        // if it does, I guess... trigger them all?
        textChannelMessageActions.forEach(function (action) {
            var _a, _b;
            (_b = (_a = eventsMap)[action.type]) === null || _b === void 0 ? void 0 : _b.call(_a, message, __assign(__assign({}, action), { guildId: message.guild.id }));
        });
    }
});
//# sourceMappingURL=onGuildTextChannelMessage.js.map