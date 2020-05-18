import BattleScene from "./BattleScene";
import { GridPosition, Value, HeroType } from "../utility/Enumeration";
import { EarthBattleManager } from "../utility/battle_managers/EarthBattleManager";

export default class BattleEarthScene extends BattleScene {

    constructor()
    {
      super('BattleEarthScene', {

          backgroundAssetKey: "earth_battle",
          enemyConfigs: [
            {
              name: "Orc Ranger",
              health: Value.StartingPlayerHealth + 200,
              imageKey: "orc_ranger",
              class: HeroType.Ranged,
              battleImageKey: "orc_ranger_battle",
              deathImageKey: "orc_ranger_death",
              castImageKey: "orc_ranger_cast",
              weaponName: "wooden_bow",
              armorName: "ranger_clothes",
              gridPosition: GridPosition.enemyTop
            },
            {
              name: "Orc Mage",
              health: Value.StartingPlayerHealth + 200,
              imageKey: "orc_mage",
              class: HeroType.Magic,
              battleImageKey: "orc_mage_battle",
              deathImageKey: "orc_mage_death",
              castImageKey: "orc_mage_cast",
              weaponName: "wooden_staff",
              armorName: "mage_clothes",
              gridPosition: GridPosition.enemyMiddle
            },
            
            {
              name: "Orc Warrior",
              health: Value.StartingPlayerHealth + 200,
              imageKey: "orc_warrior",
              class: HeroType.Melee,
              battleImageKey: "orc_warrior_battle",
              deathImageKey: "orc_warrior_death",
              castImageKey: "orc_warrior_cast",
              weaponName: "wooden_sword",
              armorName: "warrior_clothes",
              gridPosition: GridPosition.enemyBottom
            },
          ]
      });
    }

    init(data)
    {
      super.init(data);
    }

    create()
    {
      super.create();
    }

    createBattleParty()
    {
      return new EarthBattleManager(this, this.consoleLogger, this.hud, this.enemyHud, this.battleParty, this.enemyParty, this.gameMode);
    }

    update()
    {
      super.update();
    }

    protected updateAutoComplete(wordList)
    {
      super.updateAutoComplete(wordList);
    }

    protected updateInfoText(text)
    {
      super.updateInfoText(text);
    }

    protected startBattle(code)
    {
      super.startBattle(code);
    }

    protected endBattle(battleWon)
    {
      super.endBattle(battleWon);
    }

    protected handleButtonClick(code)
    {
      super.handleButtonClick(code);
    }

    protected tryAgain()
    {
      super.tryAgain();
    }

    protected findAsset(key: string)
    {
      return super.findAsset(key);
    }
}