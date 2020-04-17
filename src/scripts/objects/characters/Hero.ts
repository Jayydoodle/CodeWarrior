import { CharacterType, Depth, EventType, 
         ObjectScale, HeroType, ArmorType, 
         WeaponType } from "../../utility/Enumeration";
import { Weapon, Armor } from "../items/Item";

export class Character extends Phaser.Physics.Arcade.Sprite{

    protected imageKey: string;
    public characterType: CharacterType;

    protected allowedWeaponType: WeaponType;
    protected allowedArmorType: ArmorType;
    protected hitpoints: number;
    protected weapon: Weapon;
    protected armor: Armor;

    public isAttacking: boolean = false;
    public actedThisTurn: boolean = false;
    public priority: number = 0;

    protected initialX: number;
    protected initialY: number;
    protected animationFrames: number;
    protected animationFrameRate: number;

    constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string){
        super(scene, x, y, imageKey);
    }

    addToScene()
    {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    changeScene(scene: Phaser.Scene)
    {
        this.scene = scene;
    }

    getWeapon()
    {
        return this.weapon;
    }

    setInitialPosition()
    {
        this.initialX = this.x;
        this.initialY = this.y;
    }

    resetPosition()
    {
        this.x = this.initialX;
        this.y= this.initialY;
        this.setDepth(Depth.characterSprite);
    }

    PlayAttackAnimation()
    {
        if(this.actedThisTurn)
            return;
            
        this.anims.animationManager.create(
        {
            key: this.name,
            frames: this.anims.animationManager.generateFrameNumbers(this.imageKey, { start: 0, end: this.animationFrames }),
            frameRate: this.animationFrameRate,
            repeat: 0
        });

        this.setDepth(Depth.attacker);
        
        this.emit(EventType.attacking);
        this.actedThisTurn = true;

        this.play(this.name, true).once("animationcomplete-"+this.name, () =>
        {
            this.setFrame(0);
            this.resetPosition();
            this.isAttacking = false;
            this.emit(EventType.attackComplete, this);
        });
    }
}
export class Hero extends Character {

    public heroType: HeroType;

    constructor(x: number, y: number, scene: Phaser.Scene, config: HeroConfig) {
        super(scene, x, y, config.imageKey);

        this.characterType = CharacterType.player;
        this.heroType = config.heroType;
        this.name = config.name != null
                    ? config.name
                    : this.heroType;

        this.weapon = config.weapon != null
                    ? config.weapon
                    : this.weapon;
        
        this.armor = config.armor != null
                    ? config.armor
                    : this.armor;           

        this.hitpoints = config.hitpoints;
        this.imageKey = config.imageKey;
        this.animationFrames = config.animationFrames;
        this.animationFrameRate = config.animationFrameRate;

        this.determineEquipmentTypes();

        this.setScale(ObjectScale.battleScale, ObjectScale.battleScale);
        this.setDepth(Depth.characterSprite);
    }

    determineEquipmentTypes()
    {
        switch (this.heroType) {
            case HeroType.Warrior:
                this.allowedWeaponType = WeaponType.Melee;
                this.allowedArmorType = ArmorType.Heavy;
                break;
            case HeroType.Mage:
                this.allowedWeaponType = WeaponType.Magic;
                this.allowedArmorType = ArmorType.Robe;
                break;
            case HeroType.Ranger:
                this.allowedWeaponType = WeaponType.Ranged;
                this.allowedArmorType = ArmorType.Light;
                break;
            default:
                break;
        }
        
    }
}

export class Enemy extends Character{

    constructor(x: number, y: number, scene: Phaser.Scene, config: EnemyConfig) {
        super(scene, x, y, config.imageKey);

        this.name = config.name;
        this.characterType = CharacterType.enemy;
        this.hitpoints = config.hitpoints;
        this.imageKey = config.imageKey;
        this.animationFrames = config.animationFrames;
        this.animationFrameRate = config.animationFrameRate;

        this.setScale(-ObjectScale.battleScale, ObjectScale.battleScale);
        this.setDepth(Depth.characterSprite);
    }
}

export type HeroConfig  = {

    name: string,
    heroType: HeroType,
    hitpoints: number,
    weapon: Weapon | null,
    armor: Armor | null,
    imageKey: string,
    animationFrames: number,
    animationFrameRate: number
}

export type EnemyConfig = {

    name: string,
    hitpoints: number,
    imageKey: string,
    animationFrames: number,
    animationFrameRate: number
}