import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero, HeroType } from '../objects/characters/Hero';
import { Party } from '../utility/Party';
import { EventType } from '../utility/Enumeration';
import { GameState } from '../utility/GameState';

export default class StartScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  private gameState: GameState;

  private background: Background;
  private ranger: Hero;
  private warrior: Hero;
  private mage: Hero;
  private party: Party;

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

  private createParty()
  {
      this.ranger = new Hero(0, 0, this, {
        name: "Ranger",
        imageKey: this.findAsset("ranger_battle").key,
        heroType: HeroType.Ranger,
        hitpoints: 100,
        animationFrames: this.findAsset("ranger_battle").frames,
        animationFrameRate: 12
      });

      this.warrior = new Hero(0, 0, this, {
        name: "Warrior",
        imageKey: this.findAsset("warrior_battle").key,
        heroType: HeroType.Warrior,
        hitpoints: 100,
        animationFrames: this.findAsset("warrior_battle").frames,
        animationFrameRate: 10
      });

      this.mage = new Hero(0, 0, this, {
        name: "Mage",
        imageKey: this.findAsset("mage_battle").key,
        heroType: HeroType.Mage,
        hitpoints: 100,
        animationFrames: this.findAsset("mage_battle").frames,
        animationFrameRate: 12
      });

      this.party = new Party(this.warrior, this.mage, this.ranger);
      this.gameState = new GameState(this.party);

      this.scene.get('UIScene').children.destroy();
      this.scene.get('UIScene').events.shutdown();
      this.scene.start('BattleEarthScene', {gameState: this.gameState});
  }

  private evaluateCode(code)
  {
      try {
          eval(code); 
      } catch (e) {
          
        alert("There is an error with your code, please try again.");
        return;
      }
  }

  private findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }
}
