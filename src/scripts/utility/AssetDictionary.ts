import { AssetType } from "./Enumeration";

export class AssetDictionary{

    assets: Map<string, Asset>;

    constructor(){

        this.assets = new Map<string, Asset>();

        //#region: Background Images
        let backGroundImage = new Asset("background", "assets/backgrounds/map.png", [1280, 512], 0, AssetType.Image, false);
        let earthBackground = new Asset("earth_battle", "assets/backgrounds/earth.jpg", [640, 440], 0, AssetType.Image, false);
        let fireBackground = new Asset("fire_battle", "assets/backgrounds/fire.jpg", [640, 440], 0, AssetType.Image, false);
        let startSceneBackground = new Asset("start_scene", "assets/start_scene.jpg", [1200,720], 0, AssetType.Image, false);
        //#endregion

        //#region: Sprites
        let mageBattleSprite = new Asset("mage_battle", "assets/sprites/mage_battle.png", [192, 100], 8, AssetType.Sprite, false);
        let rangerBattleSprite = new Asset("ranger_battle", "assets/sprites/ranger_battle.png",[64, 74], 13, AssetType.Sprite, false);
        let warriorBattleSprite = new Asset("warrior_battle", "assets/sprites/warrior_battle2.png", [195, 100], 6, AssetType.Sprite, false);
        //#endregion

        //#region: Add Background Images
        this.add(backGroundImage);
        this.add(earthBackground);
        this.add(fireBackground);
        this.add(startSceneBackground);
        ////#endregion

        ///#region: Add Sprites
        this.add(mageBattleSprite);
        this.add(rangerBattleSprite);
        this.add(warriorBattleSprite);
        //#endregion
    }

    add(asset: Asset)
    {
        this.assets.set(asset.key, asset);
    }

    findAssetByKey(key: string)
    {
        let asset: Asset | undefined = this.assets.get(key.toLowerCase());

        if(asset == undefined)
            throw "Asset "+ "'" +key+ "'" +" Undefined";
        else
            return asset;
    }
}

export class Asset{

    public key: string;
    public image: string;
    public width: number;
    public height: number;
    public frames: number;
    public type: AssetType;
    public excludeFromLoad: boolean;

    constructor(imageKey: string, image: string, imageDimensions: [number, number], frames: number, assetType: AssetType, excludeFromLoad: boolean)
    {
        this.key = imageKey;
        this.image = image;
        this.width = imageDimensions[0];
        this.height = imageDimensions[1];
        this.frames = frames;
        this.type = assetType;
        this.excludeFromLoad = excludeFromLoad;
    }

    getFontData()
    {
       // if(this.type == AssetType.BitmapFont)
        {
            return "assets/font/font.xml";
        }
    }
}