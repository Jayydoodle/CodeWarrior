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
      
      var width = this.game.config.width as number;
      var height = this.game.config.height as number;

      let progressBar = this.add.graphics();
      let progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(width/2 + 180, height/2, 500, 100);

      let loadingText = this.add.text(width / 2 + 200, height / 2 - 100, 'Loading...', { 
        font: '80px monospace',
        fill: '#ffffff'
      });

      let percentText = this.add.text(width / 2 + 330, height / 2 + 10, '0%', {
          font: '80px monospace',
          fill: '#ffffff'
      });

      this.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width/2 + 180, height/2, 500 * value, 100);
        percentText.setText(Math.floor(value * 100) + '%');
      });
                
      this.load.on('fileprogress', function (file) {
          console.log(file.src);
      });
      
      this.load.on('complete', function () {
          console.log('complete');
          progressBar.destroy();
          progressBox.destroy();
          loadingText.destroy();
          percentText.destroy();
          let rightScreen:HTMLDivElement = document.getElementById("rightScreen") as HTMLDivElement;
          let leftScreen:HTMLDivElement = document.getElementById("leftScreen") as HTMLDivElement;
          rightScreen.style.display = "inline-block";
          leftScreen.style.display = "inline-block";
      });

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
      else if(asset.type == AssetType.Sound)
      {
        this.load.audio(asset.key, asset.path);
      }
  }
}
