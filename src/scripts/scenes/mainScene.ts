import { AssetDictionary } from '../utility/AssetDictionary';
import { Background } from '../objects/world_space/background';
import { Hero } from '../objects/characters/Hero';
import { Party } from '../objects/characters/Party';
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
    
  }

  findAsset(key: string)
  {
    return this.assetDictionary.findAssetByKey(key);
  }
}
