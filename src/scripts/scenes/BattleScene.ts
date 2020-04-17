import { GameObjects } from 'phaser';
import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Enemy } from '../objects/characters/Hero';
import * as Enum from '../utility/Enumeration';
import { AlignGrid } from '../utility/AlignGrid';
import { BattleParty } from '../utility/Party';
import { BattleManager } from '../utility/BattleManager';
import { GameState } from '../utility/GameState';
import { BattleConfig } from '../utility/Configuration';

export default class BattleScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  protected gameState: GameState;

  protected background: Background;
  protected alignGrid: AlignGrid;
  protected battleManager: BattleManager;
  private config: BattleConfig;

  protected turnCountText: Phaser.GameObjects.Text;

  protected battleParty: BattleParty;
  protected enemy: Enemy;

  protected currentTurn: number = 0;
  
  constructor(sceneKey: string, config: BattleConfig) {
    super({ key: sceneKey });
    this.config = config;
    this.assetDictionary = new AssetDictionary();
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

    this.enemy = new Enemy(0, 0, this, {
      name: this.config.enemyName,
      imageKey: this.findAsset(this.config.enemyAssetKey).key,
      hitpoints: 100,
      animationFrames: this.findAsset(this.config.enemyAssetKey).frames,
      animationFrameRate: 12
    });
    
    this.battleParty = BattleParty.createFromParty(this.gameState.party);

    this.battleParty.addToScene();
    this.enemy.addToScene();

    this.alignGrid.placeAtIndex(this.config.rangerPosition, this.battleParty.ranger);
    this.alignGrid.placeAtIndex(this.config.warriorPosition, this.battleParty.warrior);
    this.alignGrid.placeAtIndex(this.config.magePosition, this.battleParty.mage);
    this.alignGrid.placeAtIndex(this.config.enemyPosition, this.enemy);
    
    this.battleParty.setInitialPositions();
    this.enemy.setInitialPosition();
    
    this.battleManager = new BattleManager(this, this.battleParty, this.enemy);
    
    this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.btnApplyClicked, this.startBattle, this);
    //this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.uiLoaded, this.generateChallenge, this);

    this.turnCountText = this.add.text(0, 0, "", { color:'#000000', font: '80pt Arial'});

    this.alignGrid.placeAtIndex(8, this.turnCountText);

    this.scene.get(Enum.Scene.UIScene).scene.restart({parentScene: this.scene.key, isBattleScene: true});
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
}