import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Enemy } from '../objects/characters/Hero';
import * as Enum from '../utility/Enumeration';
import { AlignGrid } from '../utility/AlignGrid';
import { BattleParty, EnemyParty } from '../objects/characters/Party';
import { BattleManager } from '../utility/BattleManager';
import { GameState } from '../utility/GameState';
import { BattleConfig } from '../utility/Configuration';
import { ItemDatabase } from '../objects/items/ItemDatabase';
import { Weapon, Armor } from '../objects/items/Item';
import { SpellDatabase } from '../objects/spells_and_abilities/SpellDatabase';
import { Hud } from '../utility/Hud';
import { ConsoleLogger } from '../utility/ConsoleLogger';

export default class BattleScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  public itemDatabase: ItemDatabase;
  public spellDatabase: SpellDatabase;
  protected gameState: GameState;
  protected sceneType: Enum.SceneType = Enum.SceneType.BattleScene;
  protected gamewidth: number;
  protected gameHeight: number;

  protected background: Background;
  protected backgroundMusic: Phaser.Sound.BaseSound;
  protected alignGrid: AlignGrid;
  protected battleManager: BattleManager;
  protected config: BattleConfig;

  protected turnCountText: Phaser.GameObjects.Text;
  protected consoleLogger: ConsoleLogger;

  protected battleParty: BattleParty;
  protected enemyParty: EnemyParty;
  protected battleWon: boolean;

  protected hud: Hud;
  protected infoTextSet = false;
  
  constructor(sceneKey: string, config: BattleConfig) {
    super({ key: sceneKey });
    this.config = config;
    this.assetDictionary = new AssetDictionary();
    this.itemDatabase = new ItemDatabase();
    this.spellDatabase = new SpellDatabase();
  }

  init(data)
  {
    this.gameState = data.gameState;
    this.gamewidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
  }

  create() {

    this.background = new Background(this.findAsset(this.config.backgroundAssetKey).key, this, 0, 0);
    this.consoleLogger = new ConsoleLogger();

    this.backgroundMusic = this.sound.add("battle_music", { loop: true, volume: 0.4 });
    this.backgroundMusic.play();

    this.gameState.changeScene(this);

    this.alignGrid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
      height: this.gameHeight,
      width: this.gamewidth,
      showGrid: false
    });

    this.hud = new Hud(this, {
      warriorName: this.gameState.party.warrior.name,
      warriorImageKey: this.gameState.party.warrior.imageKey,
      mageName: this.gameState.party.mage.name,
      mageImageKey: this.gameState.party.mage.imageKey,
      rangerName: this.gameState.party.ranger.name,
      rangerImageKey: this.gameState.party.ranger.imageKey
    });

    this.alignGrid.placeAtIndex(86, this.hud);

    let enemies:Enemy[] = [];

    this.config.enemyConfigs.forEach(config => {

        enemies.push(new Enemy(0, 0, this, {
            name: config.name,
            heroType: config.class,
            health: config.health, 
            weapon: this.findItem(config.weaponName) as Weapon,
            armor: this.findItem(config.armorName) as Armor,
            imageKey: "",
            battleImageKey: this.findAsset(config.battleImageKey).key,
            deathImageKey: this.findAsset(config.deathImageKey).key,
            castImageKey: this.findAsset(config.castImageKey).key,
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

    this.enemyParty.group.forEach(member => {
      this.spellDatabase.spells.forEach(spell =>
      {
          member.learn(spell);
      });
    });
    
    this.battleParty.setInitialPositions();
    this.enemyParty.setInitialPositions();

    this.battleManager = this.createBattleParty();
    this.battleManager.emitter.on(Enum.EventType.BattleEnded, this.endBattle, this)

    this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.BtnApplyClicked, this.startBattle, this);
    this.scene.get(Enum.Scene.UIScene).scene.restart({parentScene: this.scene.key, sceneType: this.sceneType});

    this.turnCountText = this.add.text(0, 0, "", { color:'#000000', font: '80pt Arial'});
    this.alignGrid.placeAtIndex(8, this.turnCountText);

  }

  createBattleParty()
  {
    return new BattleManager(this, this.consoleLogger, this.hud, this.battleParty, this.enemyParty);
  }

  update() 
  {
    this.turnCountText.text = this.battleManager.getTurnCount().toString();
    this.battleManager.update();

    if(!this.infoTextSet)
    {
      this.updateAutoComplete(this.battleParty.names.concat(this.enemyParty.names));
      this.updateInfoText(this.cache.text.get("battle_text"));
    }
  }

  protected updateAutoComplete(wordList)
  {
    this.events.emit(Enum.EventType.AutoCompleteUpdate, wordList);
  }

  protected updateInfoText(text)
  {
    this.events.emit(Enum.EventType.InfoTextUpdated, text);
    this.infoTextSet = true;
  }

  protected startBattle(code)
  {
      this.battleManager.startBattle(code);
  }

  protected endBattle(battleWon)
  {
      this.battleWon = battleWon;
      this.backgroundMusic.stop();
      var result = this.add.text(0, 0, "", { color:'#ffffff', font: '250pt FontleroyBrownNF'});
      this.alignGrid.placeAtIndex(23, result);
      result.setDepth(Enum.Depth.GUI);

      if(this.battleWon)
      {
        result.text = "Victory";
        this.backgroundMusic = this.sound.add("victory_music", { loop: false });
        this.backgroundMusic.play();
        this.updateInfoText("You won the battle!\nTo continue enter:\n\nthis.continue();");
      }
      else
      {
        result.text = "Defeat";
        this.backgroundMusic = this.sound.add("defeat_music", { loop: false });
        this.backgroundMusic.play();
        this.updateInfoText("Your party was defeated.\nTo try again enter:\n\nthis.tryAgain();");
      }

      this.scene.get(Enum.Scene.UIScene).events.removeAllListeners(Enum.EventType.BtnApplyClicked);
      this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.BtnApplyClicked, this.handleButtonClick, this);
  }

  protected handleButtonClick(code)
  {
      try {
        eval(code)
      } catch (error) {
        this.consoleLogger.log(error);
      }
  }

  protected continue()
  {
    if(!this.battleWon)
      throw "Your party was defeated, cannot continue";
    
    this.consoleLogger.clear();
    this.scene.get('UIScene').events.shutdown();
    this.background.destroy();
    this.backgroundMusic.destroy();
    this.scene.start('BattleFireScene', {gameState: this.gameState} );
  }

  protected tryAgain()
  {
    if(this.battleWon)
      throw "This enemy has already been defeated";

    this.consoleLogger.clear();
    this.battleParty.reset();
    this.enemyParty.reset();
    this.backgroundMusic.stop();
    this.infoTextSet = false;
    this.scene.restart();
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