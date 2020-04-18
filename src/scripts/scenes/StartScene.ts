import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero } from '../objects/characters/Hero';
import { BattleParty } from '../utility/Party';
import { EventType, HeroType, GridPosition, Value, SceneType } from '../utility/Enumeration';
import { GameState } from '../utility/GameState';
import { ItemDatabase } from '../objects/items/ItemDatabase';
import { Weapon, Armor } from '../objects/items/Item';

export default class StartScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  public itemDatabase: ItemDatabase;
  private gameState: GameState;
  private sceneType: SceneType = SceneType.WorldScene;

  private background: Background;

  constructor() {
    super({ key: 'StartScene' });
    this.assetDictionary = new AssetDictionary();
    this.itemDatabase = new ItemDatabase();
  }

  create() {

    this.background = new Background(this.findAsset("start_scene").key, this, 0, 0);

    this.scene.get('UIScene').events.on(EventType.btnApplyClicked, this.evaluateCode, this);

    this.scene.launch('UIScene', {parentScene: this.scene.key, sceneType: this.sceneType});
  }

  createParty(warriorName, mageName, rangerName)
  {
      let warrior = new Hero(0, 0, this, {
        name: warriorName,
        heroType: HeroType.Warrior,
        hitpoints: Value.StartingPlayerHealth,
        weapon: this.findItem("wooden_sword") as Weapon,
        armor: this.findItem("warrior_clothes") as Armor,
        imageKey: "",
        battleImageKey: this.findAsset("warrior_battle").key,
        deathImageKey: this.findAsset("warrior_death").key,
        battleAnimationFrames: this.findAsset("warrior_battle").frames,
        battleAnimationFrameRate: 10,
        gridPosition: GridPosition.playerMiddle
      });

      let mage = new Hero(0, 0, this, {
        name: mageName,
        heroType: HeroType.Mage,
        hitpoints: Value.StartingPlayerHealth,
        weapon: this.findItem("wooden_staff") as Weapon,
        armor: this.findItem("mage_clothes") as Armor,
        imageKey: "",
        battleImageKey: this.findAsset("mage_battle").key,
        deathImageKey: "",
        battleAnimationFrames: this.findAsset("mage_battle").frames,
        battleAnimationFrameRate: 13,
        gridPosition: GridPosition.playerBottom
      });

      let ranger = new Hero(0, 0, this, {
        name: rangerName,
        heroType: HeroType.Ranger,
        hitpoints: Value.StartingPlayerHealth,
        weapon: this.findItem("wooden_bow") as Weapon,
        armor: this.findItem("ranger_clothes") as Armor,
        imageKey: "",
        battleImageKey: this.findAsset("ranger_battle").key,
        deathImageKey: "",
        battleAnimationFrames: this.findAsset("ranger_battle").frames,
        battleAnimationFrameRate: 13,
        gridPosition: GridPosition.playerTop
      });

      let party = new BattleParty(warrior, mage, ranger);
      this.gameState = new GameState(party);

      this.scene.get('UIScene').children.destroy();
      this.scene.get('UIScene').events.shutdown();

      this.scene.start('BattleEarthScene', {gameState: this.gameState});
  }

  evaluateCode(code)
  {
      try {
          eval(code); 
      } catch (e) {
          
        alert("There is an error with your code, please try again.");
        return;
      }
  }

  findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }

  findItem(key: string)
  {
    return this.itemDatabase.findItemByKey(key);
  }
}
