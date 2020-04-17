import BattleScene from "./BattleScene";
import { GridPosition } from "../utility/Enumeration";

export default class BattleEarthScene extends BattleScene {

    constructor()
    {
      super('BattleEarthScene', {

          backgroundAssetKey: "earth_battle",
          enemyName: "Earth",
          enemyAssetKey: "warrior_battle",
          enemyHP: 100,
          enemyPosition: GridPosition.earthEnemy,
          rangerPosition: GridPosition.earthTop,
          warriorPosition: GridPosition.earthMiddle,
          magePosition: GridPosition.earthBottom
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