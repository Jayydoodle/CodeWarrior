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

export default class BattleScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  public itemDatabase: ItemDatabase;
  public spellDatabase: SpellDatabase;
  protected gameState: GameState;
  protected sceneType: Enum.SceneType = Enum.SceneType.BattleScene;

  protected background: Background;
  protected alignGrid: AlignGrid;
  protected battleManager: BattleManager;
  private config: BattleConfig;

  protected turnCountText: Phaser.GameObjects.Text;

  protected battleParty: BattleParty;
  protected enemyParty: EnemyParty;

  private hud: Hud;
  private infoTextSet = false;
  
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
  }

  create() {

    this.background = new Background(this.findAsset(this.config.backgroundAssetKey).key, this, 0, 0);

    let backgroundMusic = this.sound.add("battle_music", { loop: true });
    backgroundMusic.play();

    this.gameState.changeScene(this);

    this.alignGrid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
      height: this.game.config.height as number,
      width: this.game.config.width as number,
      showNumbers: false
    });

    this.hud = new Hud(this, {
      warriorName: this.gameState.party.warrior.name,
      mageName: this.gameState.party.mage.name,
      rangerName: this.gameState.party.ranger.name
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
    this.battleManager = new BattleManager(this, this.hud, this.battleParty, this.enemyParty);
    
    this.scene.get(Enum.Scene.UIScene).events.on(Enum.EventType.BtnApplyClicked, this.startBattle, this);

    this.turnCountText = this.add.text(0, 0, "", { color:'#000000', font: '80pt Arial'});

    this.alignGrid.placeAtIndex(8, this.turnCountText);

    this.scene.get(Enum.Scene.UIScene).scene.restart({parentScene: this.scene.key, sceneType: this.sceneType});
  }

  update() 
  {
    this.turnCountText.text = this.battleManager.getTurnCount().toString();
    this.battleManager.update();

    if(!this.infoTextSet)
    {
      this.updateInfoText(this.cache.text.get("battle_text"));
    }
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

  protected findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }

  protected findItem(key: string)
  {
    return this.itemDatabase.findItemByKey(key);
  }
}