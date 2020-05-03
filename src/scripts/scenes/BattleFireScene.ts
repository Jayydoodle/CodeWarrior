import BattleScene from "./BattleScene";
import { GridPosition, HeroType, Value } from "../utility/Enumeration";

export default class BattleFireScene extends BattleScene {

  constructor()
  {
    super('BattleFireScene', {

        backgroundAssetKey: "fire_battle",
        enemyConfigs: [
          {
            name: "Enemy1",
            health: Value.StartingPlayerHealth + 200,
            imageKey: "warrior",
            class: HeroType.Melee,
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
            class: HeroType.Melee,
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
            class: HeroType.Melee,
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

  protected endBattle(battleWon)
  {
    super.endBattle(battleWon);
  }

  protected handleButtonClick(code)
  {
    super.handleButtonClick(code);
  }

  protected continue()
  {
    super.continue();
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