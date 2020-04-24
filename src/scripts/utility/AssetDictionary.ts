import { AssetType } from "./Enumeration";

export class AssetDictionary{

    assets: Map<string, Asset>;

    constructor()
    {
        this.assets = new Map<string, Asset>();

    //#region: Font
    

    //#endregion

    //#region: Images

        ///#region: Background
        this.add(new Asset("background", "assets/backgrounds/map.png", [1280, 512], 0, AssetType.Image, false));
        this.add(new Asset("earth_battle", "assets/backgrounds/earth.jpg", [640, 440], 0, AssetType.Image, false));
        this.add(new Asset("fire_battle", "assets/backgrounds/fire.jpg", [640, 440], 0, AssetType.Image, false));
        this.add(new Asset("start_scene", "assets/start_scene.jpg", [1200,720], 0, AssetType.Image, false));
        ///#endregion

        ///#region: HUD

        this.add(new Asset("hud_layout", "assets/battlehud/Layout.png", [573, 32], 0, AssetType.Image, false));

        ///#endregion

    //#endregion

    //#region: Sound

        ///#region: Music

        this.add(new Asset("start_music", "assets/sounds/StartScreen.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("battle_music", "assets/sounds/battle_music.mp3", [0,0], 0, AssetType.Sound, false));

        ///#endregion

    
    //#endregion

    //#region: Sprites

        ///#region: Character Sprites
        this.add(new Asset("mage_battle", "assets/sprites/mage_battle.png", [192, 100], 8, AssetType.Sprite, false));
        this.add(new Asset("mage_death", "assets/sprites/mage_death.png", [64, 90], 6, AssetType.Sprite, false));
        this.add(new Asset("mage_cast", "assets/sprites/mage_cast.png", [63, 70], 7, AssetType.Sprite, false));

        this.add(new Asset("ranger_battle", "assets/sprites/ranger_battle.png",[64, 74], 13, AssetType.Sprite, false));
        this.add(new Asset("ranger_death", "assets/sprites/ranger_death.png", [64, 64], 6, AssetType.Sprite, false));
        this.add(new Asset("ranger_cast", "assets/sprites/ranger_cast.png", [63, 70], 7, AssetType.Sprite, false));

        this.add(new Asset("warrior_battle", "assets/sprites/warrior_battle.png", [195, 100], 6, AssetType.Sprite, false));
        this.add(new Asset("warrior_death", "assets/sprites/warrior_death.png", [64, 90], 6, AssetType.Sprite, false));
        this.add(new Asset("warrior_cast", "assets/sprites/warrior_cast.png", [63, 70], 7, AssetType.Sprite, false));
        ///#endregion

        ///#region: Limit Burst Sprites

        this.add(new Asset("lb_benediction", "assets/spells/limit_burst/Benediction.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_collapse", "assets/spells/limit_burst/Collapse.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_discharge", "assets/spells/limit_burst/Discharge.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_freeze", "assets/spells/limit_burst/Freeze.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_inferno", "assets/spells/limit_burst/Inferno.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_luminescence", "assets/spells/limit_burst/Luminescence.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_nova", "assets/spells/limit_burst/Nova.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_resurrection", "assets/spells/limit_burst/Resurrection.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_tempest", "assets/spells/limit_burst/Tempest.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_torrent", "assets/spells/limit_burst/Torrent.png", [192,192], 100, AssetType.Sprite, false));
        this.add(new Asset("lb_upheaval", "assets/spells/limit_burst/Upheaval.png", [192,192], 100, AssetType.Sprite, false));

        ///#endregion

        ///#region: Spell Sprites

            ////#region: Animation

            this.add(new Asset("cast_main", "assets/spells/cast/cast_white.png", [192,192], 100, AssetType.Sprite, false));
            this.add(new Asset("cast_white", "assets/spells/cast/cast_purple.png", [192,192], 100, AssetType.Sprite, false));
            this.add(new Asset("cast_black", "assets/spells/cast/cast_green.png", [192,192], 100, AssetType.Sprite, false));

            ////#endregion

            ////#region: Black Magic

            this.add(new Asset("dark_spell_1", "assets/spells/black_magic/dark1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("dark_spell_2", "assets/spells/black_magic/dark2.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("dark_spell_3", "assets/spells/black_magic/dark3.png", [192, 192], 100, AssetType.Sprite, false));

            
            this.add(new Asset("earth_spell_1", "assets/spells/black_magic/earth1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("earth_spell_2", "assets/spells/black_magic/earth2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("earth_spell_3", "assets/spells/black_magic/earth3.png", [192, 192], 100, AssetType.Sprite, false));

           
            

            this.add(new Asset("fire_spell_1", "assets/spells/black_magic/fire1.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("fire_spell_2", "assets/spells/black_magic/fire2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("fire_spell_3", "assets/spells/black_magic/fire3.png", [192, 192], 100, AssetType.Sprite, false));



            this.add(new Asset("ice_spell_1", "assets/spells/black_magic/ice1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("ice_spell_2", "assets/spells/black_magic/ice2.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("ice_spell_3", "assets/spells/black_magic/ice3.png", [192, 192], 100, AssetType.Sprite, false));


            this.add(new Asset("lightning_spell_1", "assets/spells/black_magic/lightning3.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("lightning_spell_2a", "assets/spells/black_magic/lightning2_a.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("lightning_spell_2b", "assets/spells/black_magic/lightning2_b.png", [192, 192], 100, AssetType.Sprite, false));


            this.add(new Asset("water_spell_1", "assets/spells/black_magic/water1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("water_spell_2", "assets/spells/black_magic/water2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("water_spell_3", "assets/spells/black_magic/water3.png", [192, 192], 100, AssetType.Sprite, false));


            this.add(new Asset("wind_spell_1", "assets/spells/black_magic/wind1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("wind_spell_2", "assets/spells/black_magic/wind2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("wind_spell_3", "assets/spells/black_magic/wind3.png", [192, 192], 100, AssetType.Sprite, false));
            
            ////#endregion

            ////#region: White Magic

            this.add(new Asset("cure_spell_1", "assets/spells/white_magic/cure1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("cure_spell_2", "assets/spells/white_magic/cure2.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("cure_spell_3", "assets/spells/white_magic/cure3.png", [192, 192], 100, AssetType.Sprite, false));


            this.add(new Asset("protect_spell_1", "assets/spells/white_magic/protect1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("protect_spell_2", "assets/spells/white_magic/protect2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("protect_spell_3", "assets/spells/white_magic/protect3.png", [192, 192], 100, AssetType.Sprite, false));


            this.add(new Asset("remedy_spell", "assets/spells/white_magic/remedy.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("revive_spell", "assets/spells/white_magic/revive.png", [192, 192], 100, AssetType.Sprite, false));



            ////#endregion

        ///#endregion

        ///#region: Text

            this.add(new Asset('battle_text', 'assets/text/battle.txt', [0, 0], 0, AssetType.Text, false));
            this.add(new Asset('start_text', 'assets/text/start.txt', [0, 0], 0, AssetType.Text, false));
            this.add(new Asset("test_script", 'assets/text/testScript.txt', [0, 0], 0, AssetType.Text, false));

        ///#endregion


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
    public path: string;
    public width: number;
    public height: number;
    public frames: number;
    public type: AssetType;
    public excludeFromLoad: boolean;

    constructor(key: string, path: string, imageDimensions: [number, number], frames: number, assetType: AssetType, excludeFromLoad: boolean)
    {
        this.key = key;
        this.path = path;
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