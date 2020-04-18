import { GameObjects } from 'phaser';
import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Enemy } from '../objects/characters/Hero';
import * as Enum from '../utility/Enumeration';
import { AlignGrid } from '../utility/AlignGrid';
import { BattleParty, EnemyParty } from '../utility/Party';
import { BattleManager } from '../utility/BattleManager';
import { GameState } from '../utility/GameState';
import { BattleConfig } from '../utility/Configuration';
import { ItemDatabase } from '../objects/items/ItemDatabase';
import { Weapon, Armor } from '../objects/items/Item';

export default class BattleScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  public itemDatabase: ItemDatabase;
  protected gameState: GameState;
  protected sceneType: Enum.SceneType = Enum.SceneType.BattleScene;

  protected background: Background;
  protected alignGrid: AlignGrid;
  protected battleManager: BattleManager;
  private config: BattleConfig;

  protected turnCountText: Phaser.GameObjects.Text;

  protected battleParty: BattleParty;
  protected enemyParty: EnemyParty;
  protected currentTurn: number = 0;
  
  constructor(sceneKey: string, config: BattleConfig) {
    super({ key: sceneKey });
    this.config = config;
    this.assetDictionary = new AssetDictionary();
    this.itemDatabase = new ItemDatabase();
  }

  init(data)
  {
    this.gameState = data.gameState;
  }

  create() {

    this.background = new Background(this.findAsset(this.config.backgroundAssetKey).key, this, 0, 0);

    this.gameState.changeScene(this);

    this.alignGrid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
      height: this.game.config.height as number,
      width: this.game.config.width as number,
      showNumbers: false
    });

    let enemies:Enemy[] = [];

    this.config.enemyConfigs.forEach(config => {

        enemies.push(new Enemy(0, 0, this, {
          name: config.name,
          heroType: Enum.HeroType.Warrior,
          hitpoints: config.hitpoints, 
          weapon: this.findItem(config.weaponName) as Weapon,
          armor: this.findItem(config.armorName) as Armor,
          imageKey: "",
          battleImageKey: this.findAsset(config.battleImageKey).key,
          deathImageKey: this.findAsset(config.deathImageKey).key,
          battleAnimationFrames: this.findAsset(config.battleImageKey).frames,
          battleAnimationFrameRate: 10,
          gridPosition: config.gridPosition
        }));
    });
    
    this.battleParty = this.gameState.party;
    this.enemyParty = new EnemyParty(enemies);

    this.battleParty.addToScene(Enum.SceneType.BattleScene);
    this.enemyParty.addToScene(Enum.SceneType.BattleScene);

    this.battleParty.group.forEach(member => {
      this.alignGrid.placeAtIndex(member.gridPosition, member);
    });

    this.enemyParty.group.forEach(member => {
      this.alignGrid.placeAtIndex(member.gridPosition, member);
    });
    
    this.battleParty.setInitialPositions();
    this.enemyParty.setInitialPositions();
    
    this.battleManager = new BattleManager(this, this.battleParty, this.enemyParty);
    
    this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.btnApplyClicked, this.startBattle, this);

    this.turnCountText = this.add.text(0, 0, "", { color:'#000000', font: '80pt Arial'});

    this.alignGrid.placeAtIndex(8, this.turnCountText);

    this.scene.get(Enum.Scene.UIScene).scene.restart({parentScene: this.scene.key, sceneType: this.sceneType});
  }

  update() 
  {
    this.turnCountText.text = this.battleManager.getTurnCount().toString();
    this.battleManager.update();
    this.updateInfoText("Available Actions: this.attack(enemy);\n\nAvailable target: this.enemy");
  }

  protected updateInfoText(text)
  {
    this.events.emit(Enum.EventType.infoTextUpdated, text);
  }

  protected startBattle(code)
  {
      this.battleManager.startBattle(code);
  }

  protected findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }

  protected findItem(key: string)
  {
    return this.itemDatabase.findItemByKey(key);
  }
}