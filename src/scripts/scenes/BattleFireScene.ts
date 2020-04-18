import BattleScene from "./BattleScene";
import { GridPosition } from "../utility/Enumeration";

export default class BattleFireScene extends BattleScene {

    constructor()
    {
      super('BattleFireScene', {

          backgroundAssetKey: "fire_battle",
          enemyConfigs: []
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