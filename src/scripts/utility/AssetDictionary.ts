import { AssetType } from "./Enumeration";

export class AssetDictionary{

    assets: Map<string, Asset>;

    constructor()
    {
        this.assets = new Map<string, Asset>();

    //#region : Font
    

    //#endregion

    //#region : Images

        ///#region : Background
        this.add(new Asset("background", "assets/backgrounds/map.png", [1280, 512], 0, AssetType.Image, false));
        this.add(new Asset("earth_battle", "assets/backgrounds/earth.jpg", [640, 440], 0, AssetType.Image, false));
        this.add(new Asset("fire_battle", "assets/backgrounds/fire.jpg", [640, 440], 0, AssetType.Image, false));
        this.add(new Asset("start_scene", "assets/backgrounds/start_scene.jpg", [1200,720], 0, AssetType.Image, false));
        ///#endregion

        ///#region : Tutorial

        this.add(new Asset("tutorial_1", "assets/backgrounds/tutorial/tutorial_1.png", [1920, 1080], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_2", "assets/backgrounds/tutorial/tutorial_2.png", [1961, 976], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_3", "assets/backgrounds/tutorial/tutorial_3.png", [1920, 959], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_4", "assets/backgrounds/tutorial/tutorial_4.png", [1920, 959], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_5", "assets/backgrounds/tutorial/tutorial_5.png", [1920, 959], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_6", "assets/backgrounds/tutorial/tutorial_6.png", [1920, 1080], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_7", "assets/backgrounds/tutorial/tutorial_7.png", [1920, 1119], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_8", "assets/backgrounds/tutorial/tutorial_8.png", [1920, 954], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_9", "assets/backgrounds/tutorial/tutorial_9.png", [1947, 951], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_10", "assets/backgrounds/tutorial/tutorial_10.png", [1920, 951], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_11", "assets/backgrounds/tutorial/tutorial_11.png", [1920, 951], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_12", "assets/backgrounds/tutorial/tutorial_12.png", [1920, 951], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_13", "assets/backgrounds/tutorial/tutorial_13.png", [1920, 1080], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_14", "assets/backgrounds/tutorial/tutorial_14.png", [1916, 893], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_15", "assets/backgrounds/tutorial/tutorial_15.png", [1908, 901], 0, AssetType.Image, false));
        this.add(new Asset("tutorial_16", "assets/backgrounds/tutorial/tutorial_16.png", [1920, 1080], 0, AssetType.Image, false));

        ///#endregion

        ///#region : HUD

        this.add(new Asset("hud_layout", "assets/battlehud/Layout.png", [573, 32], 0, AssetType.Image, false));
        this.add(new Asset("hud_icons", "assets/icons/IconSet.png", [32, 32], 320, AssetType.Sprite, false));
        this.add(new Asset("hud_health", "assets/battlehud/health_bar.png", [315, 3], 0, AssetType.Image, false));
        this.add(new Asset("hud_mp", "assets/battlehud/mp_bar.png", [315, 3], 0, AssetType.Image, false));
        this.add(new Asset("hud_tp", "assets/battlehud/tp_bar.png", [315, 3], 0, AssetType.Image, false));

        this.add(new Asset("enemy_health2", "assets/battlehud/Turn.png", [573,32], 0, AssetType.Image, false));
        this.add(new Asset("enemy_health", "assets/battlehud/enemy_health.png", [315,3], 0, AssetType.Image, false));
        this.add(new Asset("enemy_health_gauge", "assets/battlehud/enemy_gauge.png", [507,78], 0, AssetType.Image, false));

        ///#endregion

    //#endregion

    //#region : Sound

        ///#region : Music

        this.add(new Asset("start_music", "assets/sounds/StartScreen.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("battle_music", "assets/sounds/battle_music.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("victory_music", "assets/sounds/Victory.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("defeat_music", "assets/sounds/Defeat.mp3", [0,0], 0, AssetType.Sound, false));

        ///#endregion

        ///#region : LimibtBurstFx
        
        this.add(new Asset("lb_sound_earth", "assets/sounds/LimitBurstFX/earth_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_fire", "assets/sounds/LimitBurstFX/fire_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_heal", "assets/sounds/LimitBurstFX/heal_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_ice", "assets/sounds/LimitBurstFX/ice_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_lightning", "assets/sounds/LimitBurstFX/lightning_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_revive", "assets/sounds/LimitBurstFX/revive_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_water", "assets/sounds/LimitBurstFX/water_lb.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("lb_sound_wind", "assets/sounds/LimitBurstFX/wind_lb.mp3", [0,0], 0, AssetType.Sound, false));

        ///#endregion

        ///#region : SpellFx


            ////#region : Black Magic

            this.add(new Asset("dark_sound", "assets/sounds/SpellFX/black_magic/dark_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("earth_sound", "assets/sounds/SpellFX/black_magic/earth_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("fire_sound", "assets/sounds/SpellFX/black_magic/fire_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("ice_sound", "assets/sounds/SpellFX/black_magic/ice_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("lightning_sound", "assets/sounds/SpellFX/black_magic/lightning_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("poison_sound", "assets/sounds/SpellFX/black_magic/poison_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("water_sound", "assets/sounds/SpellFX/black_magic/water_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("wind_sound", "assets/sounds/SpellFX/black_magic/wind_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("death_sound", "assets/sounds/SpellFX/black_magic/death_sound.mp3", [0,0], 0, AssetType.Sound, false));

            ////#endregion

            ////#region : Debuff

            this.add(new Asset("sleep_sound", "assets/sounds/SpellFX/debuff/sleep_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("confuse_sound", "assets/sounds/SpellFX/debuff/confuse_sound.mp3", [0,0], 0, AssetType.Sound, false));

            ////#endregion

            ////#region : White Magic

            this.add(new Asset("cure_sound", "assets/sounds/SpellFX/white_magic/cure_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("remedy_sound", "assets/sounds/SpellFX/white_magic/remedy_sound.mp3", [0,0], 0, AssetType.Sound, false));
            this.add(new Asset("revive_sound", "assets/sounds/SpellFX/white_magic/revive_sound.mp3", [0,0], 0, AssetType.Sound, false));

            ////#endregion

        ///#endregion

        ///#region : WeaponFX

        this.add(new Asset("bow_sound", "assets/sounds/WeaponFX/bow.wav", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("staff_sound", "assets/sounds/WeaponFX/staff.mp3", [0,0], 0, AssetType.Sound, false));
        this.add(new Asset("sword_sound", "assets/sounds/WeaponFX/sword.wav", [0,0], 0, AssetType.Sound, false));

        ///#endregion

    //#endregion

    //#region : Sprites

        ///#region : Ability Sprites

        this.add(new Asset("bow_hit", "assets/spells/attack/thrust2.png", [192, 192], 15, AssetType.Sprite, false));
        this.add(new Asset("staff_hit", "assets/spells/attack/pink.png", [192, 192], 35, AssetType.Sprite, false));
        this.add(new Asset("sword_hit", "assets/spells/attack/slash3.png", [192, 192], 15, AssetType.Sprite, false));

        ///#endregion

        ///#region : Character Sprites
        
        //Player
        this.add(new Asset("mage_battle", "assets/sprites/player/mage_battle.png", [192, 100], 8, AssetType.Sprite, false));
        this.add(new Asset("mage_death", "assets/sprites/player/mage_death.png", [64, 90], 6, AssetType.Sprite, false));
        this.add(new Asset("mage_cast", "assets/sprites/player/mage_cast.png", [63, 70], 7, AssetType.Sprite, false));

        this.add(new Asset("ranger_battle", "assets/sprites/player/ranger_battle.png",[64, 74], 13, AssetType.Sprite, false));
        this.add(new Asset("ranger_death", "assets/sprites/player/ranger_death.png", [64, 64], 6, AssetType.Sprite, false));
        this.add(new Asset("ranger_cast", "assets/sprites/player/ranger_cast.png", [63, 70], 7, AssetType.Sprite, false));

        this.add(new Asset("warrior_battle", "assets/sprites/player/warrior_battle.png", [195, 100], 6, AssetType.Sprite, false));
        this.add(new Asset("warrior_death", "assets/sprites/player/warrior_death.png", [64, 90], 6, AssetType.Sprite, false));
        this.add(new Asset("warrior_cast", "assets/sprites/player/warrior_cast.png", [63, 70], 7, AssetType.Sprite, false));

        //Enemies
        this.add(new Asset("orc_mage_battle", "assets/sprites/orcs/orc_mage_battle.png", [192, 100], 8, AssetType.Sprite, false));
        this.add(new Asset("orc_mage_death", "assets/sprites/orcs/orc_mage_death.png", [64, 80], 6, AssetType.Sprite, false));
        this.add(new Asset("orc_mage_cast", "assets/sprites/orcs/orc_mage_cast.png", [63, 70], 7, AssetType.Sprite, false));
        this.add(new Asset("orc_ranger_battle", "assets/sprites/orcs/orc_ranger_battle.png",[64, 74], 13, AssetType.Sprite, false));
        this.add(new Asset("orc_ranger_death", "assets/sprites/orcs/orc_ranger_death.png", [64, 64], 6, AssetType.Sprite, false));
        this.add(new Asset("orc_ranger_cast", "assets/sprites/orcs/orc_ranger_cast.png", [63, 70], 7, AssetType.Sprite, false));
        this.add(new Asset("orc_warrior_battle", "assets/sprites/orcs/orc_warrior_battle.png", [64, 70], 6, AssetType.Sprite, false));
        this.add(new Asset("orc_warrior_death", "assets/sprites/orcs/orc_warrior_death.png", [64, 64], 6, AssetType.Sprite, false));
        this.add(new Asset("orc_warrior_cast", "assets/sprites/orcs/orc_warrior_cast.png", [63, 70], 7, AssetType.Sprite, false));
        ///#endregion

        ///#region : Limit Burst Sprites

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

        ///#region : Spell Sprites

            ////#region : Animation

            this.add(new Asset("cast_main", "assets/spells/cast/cast_white.png", [192,192], 100, AssetType.Sprite, false));
            this.add(new Asset("cast_white", "assets/spells/cast/cast_purple.png", [192,192], 100, AssetType.Sprite, false));
            this.add(new Asset("cast_black", "assets/spells/cast/cast_green.png", [192,192], 100, AssetType.Sprite, false));

            ////#endregion

            ////#region : Black Magic

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

            this.add(new Asset("lightning_spell_1", "assets/spells/black_magic/lightning1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("lightning_spell_2a", "assets/spells/black_magic/lightning2_a.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("lightning_spell_2b", "assets/spells/black_magic/lightning2_b.png", [192, 192], 100, AssetType.Sprite, false));

            this.add(new Asset("water_spell_1", "assets/spells/black_magic/water1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("water_spell_2", "assets/spells/black_magic/water2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("water_spell_3", "assets/spells/black_magic/water3.png", [192, 192], 100, AssetType.Sprite, false));

            this.add(new Asset("wind_spell_1", "assets/spells/black_magic/wind1.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("wind_spell_2", "assets/spells/black_magic/wind2.png", [192, 192], 100, AssetType.Sprite, false));
            //this.add(new Asset("wind_spell_3", "assets/spells/black_magic/wind3.png", [192, 192], 100, AssetType.Sprite, false));

            this.add(new Asset("confuse", "assets/spells/black_magic/confuse.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("poison", "assets/spells/black_magic/poison.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("sleep", "assets/spells/black_magic/sleep.png", [192, 192], 100, AssetType.Sprite, false));
            this.add(new Asset("death", "assets/spells/black_magic/death.png", [192, 192], 100, AssetType.Sprite, false));
            
            ////#endregion

            ////#region : White Magic

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

        ///#region : Text

            this.add(new Asset('battle_text', 'assets/text/battle.txt', [0, 0], 0, AssetType.Text, false));
            this.add(new Asset('autocomplete_list', 'assets/text/autocomplete_list.txt', [0, 0], 0, AssetType.Text, false));
            this.add(new Asset('start_text', 'assets/text/start.txt', [0, 0], 0, AssetType.Text, false));
            this.add(new Asset("test_script", 'assets/text/testScript.txt', [0, 0], 0, AssetType.Text, false));
            this.add(new Asset("battle_template", 'assets/text/battle_template.txt', [0, 0], 0, AssetType.Text, false));


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