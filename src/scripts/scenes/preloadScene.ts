import { AssetDictionary, Asset } from "../utility/AssetDictionary";
import { AssetType } from "../utility/Enumeration";

export default class PreloadScene extends Phaser.Scene {

  assetDictionary: AssetDictionary;

  constructor() {
    super({ key: 'PreloadScene' });
    this.assetDictionary = new AssetDictionary();
  }

  preload() 
  {
      this.assetDictionary.assets.forEach(x => {

        this.loadAsset(x);

      });
  }

  create() 
  {
    this.scene.start('StartScene');
  }

  private loadAsset(asset: Asset)
  {
      if(asset.excludeFromLoad)
        return;

      if(asset.type == AssetType.Image)
      {
        this.load.image(asset.key, asset.path);
      }
      else if(asset.type == AssetType.Sprite)
      {
        this.load.spritesheet(asset.key, asset.path, { 
    
        frameWidth: asset.width,
        frameHeight: asset.height
        });
      }
      else if(asset.type == AssetType.BitmapFont)
      {
        this.load.bitmapFont(asset.key, asset.path, asset.getFontData());
      }
      else if(asset.type == AssetType.Text)
      {
        this.load.text(asset.key, asset.path);
      }
  }
}
