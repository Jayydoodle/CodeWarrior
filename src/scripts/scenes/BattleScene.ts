import { GameObjects } from 'phaser';
import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero, Enemy, HeroConfig, HeroType } from '../objects/characters/Hero';
import * as Enum from '../utility/Enumeration';
import { ArmorType, WeaponType } from '../objects/items/Item';
import { AlignGrid } from '../utility/AlignGrid';
import { BattleParty } from '../utility/Party';
import { BattleManager } from '../utility/BattleManager';
import { GameState } from '../utility/GameState';
import { ChallengeManager } from '../utility/ChallengeManager';
import { BattleConfig } from '../utility/Configuration';

export default class BattleScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  protected gameState: GameState;

  protected background: Background;
  protected alignGrid: AlignGrid;
  protected battleManager: BattleManager;
  protected challengeManager: ChallengeManager;
  private config: BattleConfig;

  protected timerText: Phaser.GameObjects.Text;

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
    this.challengeManager = new ChallengeManager();
    
    this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.btnApplyClicked, this.evaluateAnswer, this);
    this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.uiLoaded, this.generateChallenge, this);
    this.challengeManager.emitter.on(Enum.EventType.infoTextUpdated, this.updateInfoText, this);

    this.timerText = this.add.text(100, 100, "", { color:'#ffffff', font: '50pt Arial'});

    this.scene.get(Enum.Scene.UIScene).scene.restart({parentScene: this.scene.key, isBattleScene: true});

  }

  update() 
  {
    this.timerText.text = this.battleManager.getElapsedTime();
    this.battleManager.update();
  }

  protected generateChallenge()
  {
    this.challengeManager.generateChallege();
  }

  protected evaluateAnswer(code)
  {
      let correctAnswer: boolean = this.challengeManager.evaluateAnswer(code);

      if(correctAnswer)
      {
        this.battleManager.playerAttack();
        this.challengeManager.generateChallege();
      }

      this.nextTurn(correctAnswer);
  }

  protected updateInfoText(text)
  {
    this.events.emit(Enum.EventType.infoTextUpdated, text);
  }

  protected nextTurn(correctAnswer)
  {
      if(correctAnswer)
        this.events.emit(Enum.EventType.correctAnswer)
      else
        this.events.emit(Enum.EventType.turnEnded);
  }

  protected findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }
}