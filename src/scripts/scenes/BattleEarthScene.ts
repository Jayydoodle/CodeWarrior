import BattleScene from "./BattleScene";
import { GridPosition, Value } from "../utility/Enumeration";

export default class BattleEarthScene extends BattleScene {

    constructor()
    {
      super('BattleEarthScene', {

          backgroundAssetKey: "earth_battle",
          enemyConfigs: [
            {
              name: "Enemy1",
              health: Value.StartingPlayerHealth + 200,
              imageKey: "warrior",
              battleImageKey: "warrior_battle",
              deathImageKey: "warrior_death",
              castImageKey: "warrior_cast",
              weaponName: "wooden_sword",
              armorName: "warrior_clothes",
              gridPosition: GridPosition.enemyTop
            },
            {
              name: "Enemy2",
              health: Value.StartingPlayerHealth + 200,
              imageKey: "warrior",
              battleImageKey: "warrior_battle",
              deathImageKey: "warrior_death",
              castImageKey: "warrior_cast",
              weaponName: "wooden_sword",
              armorName: "warrior_clothes",
              gridPosition: GridPosition.enemyMiddle
            },
            {
              name: "Enemy3",
              health: Value.StartingPlayerHealth + 200,
              imageKey: "warrior",
              battleImageKey: "warrior_battle",
              deathImageKey: "warrior_death",
              castImageKey: "warrior_cast",
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

    update()
    {
      super.update();
    }

    protected updateInfoText(text)
    {
      super.updateInfoText(text);
    }

    protected startBattle(code)
    {
      super.startBattle(code);
    }

    protected findAsset(key: string)
    {
      return super.findAsset(key);
    }
}