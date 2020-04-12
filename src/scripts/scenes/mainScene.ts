import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero, HeroType } from '../objects/characters/Hero';
import { Party } from '../utility/Party';
import { GameState } from '../utility/GameState';

export default class MainScene extends Phaser.Scene {

  public assetDictionary: AssetDictionary;
  private gameState: GameState;

  private background: Background;
  private gameWidth: number;
  private gameHeight: number;
  private graphics: Phaser.GameObjects.Graphics;
  private ranger: Hero;
  private warrior: Hero;
  private mage: Hero;
  private party: Party;

  constructor() {
    super({ key: 'MainScene' });
    this.assetDictionary = new AssetDictionary();
  }

  create() {
    
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;

    this.scene.launch('UIScene');
  }

  update() {


  }

  createNewParty()
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
  }

  findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }
}
