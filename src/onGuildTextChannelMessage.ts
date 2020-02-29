
import { Message } from "discord.js";
import sendTextChannelMessage from "./actions/sendTextChannelMessage";
import sendDirectMessage from "./actions/sendDirectMessage";
import TriggersCache from "./TriggersCache";


const eventsMap = {
    "SendTextChannelMessage": sendTextChannelMessage,
    "SendDirectMessage": sendDirectMessage
}

/**
 * If I were to phrase this like a story, I'd say that GUILD RELATED ACTIONS come here.
 */
export default (message: Message) => {
    /* I know for sure it's a guild message in a text channel, then 
    I should look whether there's a trigger registered for this kind of event. */
    // check if the Guild is even registered in the trigger map (we assume that we're good coders and if it is not, it means that someone hasn't paid something)
    const guildTriggerMap = TriggersCache.instance.guilds[message.guild.id].triggers;

    // check if the guild has the trigger we're looking for
    const textChannelMessageActions = guildTriggerMap?.message;
    if (textChannelMessageActions) {
        // if it does, I guess... trigger them all?
        textChannelMessageActions.forEach(action => {
            eventsMap[action.type]?.(message, {
                ...action,
                guildId: message.guild.id
            });
        });
    }
    
};