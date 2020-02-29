export default class TriggersCache {
  
  /* START OF SINGLETON SHIT */
  private static _instance: TriggersCache;
  public static get instance() {
    if (!TriggersCache._instance) {
      TriggersCache._instance = new TriggersCache();
    }
    return TriggersCache._instance;
  }
  /* END OF SINGLETON SHIT */

  protected constructor() {
    this.guilds = {};
  }

  public guilds;
}