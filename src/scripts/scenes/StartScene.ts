import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero } from '../objects/characters/Hero';
import { Party } from '../utility/Party';
import { EventType, HeroType } from '../utility/Enumeration';
import { GameState } from '../utility/GameState';

export default class StartScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  private gameState: GameState;

  private background: Background;

  constructor() {
    super({ key: 'StartScene' });
    this.assetDictionary = new AssetDictionary();
  }

  create() {

    this.background = new Background(this.findAsset("start_scene").key, this, 0, 0);

    this.scene.get('UIScene').events.on(EventType.btnApplyClicked, this.evaluateCode, this);

    this.scene.launch('UIScene', {parentScene: this.scene.key});
  }

  update() {


  }

  createParty(warriorName, mageName, rangerName)
  {
      let warrior = new Hero(0, 0, this, {
        name: warriorName,
        imageKey: this.findAsset("warrior_battle").key,
        heroType: HeroType.Warrior,
        hitpoints: 100,
        animationFrames: this.findAsset("warrior_battle").frames,
        animationFrameRate: 10
      });

      let mage = new Hero(0, 0, this, {
        name: mageName,
        imageKey: this.findAsset("mage_battle").key,
        heroType: HeroType.Mage,
        hitpoints: 100,
        animationFrames: this.findAsset("mage_battle").frames,
        animationFrameRate: 13
      });

      let ranger = new Hero(0, 0, this, {
        name: rangerName,
        imageKey: this.findAsset("ranger_battle").key,
        heroType: HeroType.Ranger,
        hitpoints: 100,
        animationFrames: this.findAsset("ranger_battle").frames,
        animationFrameRate: 13
      });

      let party = new Party(warrior, mage, ranger);
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
}
