import BattleScene from "./BattleScene";
import { GridPosition } from "../utility/Enumeration";

export default class BattleFireScene extends BattleScene {

    constructor()
    {
      super('BattleFireScene', {

          backgroundAssetKey: "fire_battle",
          enemyName: "Enemy",
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

    protected generateChallenge()
    {
      super.generateChallenge();
    }

    protected evaluateAnswer(code)
    {
      super.evaluateAnswer(code);
    }

    protected updateInfoText(text)
    {
      super.updateInfoText(text);
    }

    protected nextTurn(correctAnswer)
    {
      super.nextTurn(correctAnswer);
    }

    protected findAsset(key: string)
    {
      return super.findAsset(key);
    }
}