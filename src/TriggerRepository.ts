export default class TriggerRepository {
    
    private static instance: TriggerRepository;

    public static getInstance() {
        if (!TriggerRepository.instance) {
            TriggerRepository.instance = new TriggerRepository();
        }
        return TriggerRepository.instance;
    }

    /* END OF STATIC STUFF */
    
    triggerMap = {};

    protected constructor() {}

    public addGuild(guildId) {
        this.triggerMap[guildId] = {};
    }

    public getTriggersForGuild(guildId) {
        return this.triggerMap[guildId];
    }

    public addTriggerForGuild(guildId, trigger) {
        const { triggerType, action } = trigger;
        this.triggerMap[guildId][triggerType] = action;
    }    
}