import { CharacterType, Depth, EventType, 
         ObjectScale, HeroType, ArmorType, 
         WeaponType, GridPosition, SceneType, Value} from "../../utility/Enumeration";
import { Weapon, Armor } from "../items/Item";

export class Character extends Phaser.Physics.Arcade.Sprite{

    protected imageKey: string;
    protected battleImageKey: string;
    protected deathImageKey: string;
    public characterType: CharacterType;

    protected allowedWeaponType: WeaponType;
    protected allowedArmorType: ArmorType;
    protected hitpoints: number;
    protected weapon: Weapon;
    protected armor: Armor;

    public isAttacking: boolean = false;
    public actedThisTurn: boolean = false;
    public isAlive: boolean = true;
    public priority: number = 0;
    public gridPosition: GridPosition;

    protected initialX: number;
    protected initialY: number;
    protected animationFrames: number;
    protected animationFrameRate: number;
    protected battleAnimationFrames: number;
    protected battleAnimationFrameRate: number;
    protected deathAnimationFrames: number;
    protected deathAnimationFrameRate: number;

    constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string){
        super(scene, x, y, imageKey);
    }

    addToScene(sceneType: SceneType)
    {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if(sceneType == SceneType.BattleScene)
            this.setTexture(this.battleImageKey, 0);
    }

    changeScene(scene: Phaser.Scene)
    {
        this.scene = scene;
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

    configureAttack()
    {
        this.isAttacking = true;
        this.setDepth(Depth.attacker);
    }

    getBaseAttack()
    {
        return this.weapon.attackPower;
    }

    getBaseDefense()
    {
        return this.armor.mitigation;
    }

    takeDamage(damage: number)
    {
        this.hitpoints -= damage;

        if(this.hitpoints <= 0)
        {
            this.isAlive = false;
        }
    }

    getHp()
    {
        return this.hitpoints;
    }

    PlayAttackAnimation()
    {
        if(this.actedThisTurn)
            return;
            
        this.anims.animationManager.create(
        {
            key: this.name+"_attack",
            frames: this.anims.animationManager.generateFrameNumbers(this.battleImageKey, { start: 0, end: this.battleAnimationFrames }),
            frameRate: this.battleAnimationFrameRate,
            repeat: 0
        });
        
        this.emit(EventType.attacking);
        this.actedThisTurn = true;

        this.play(this.name+"_attack", true).once("animationcomplete-"+this.name+"_attack", () =>
        {
            this.setFrame(0);
            this.resetPosition();
            this.isAttacking = false;
            this.emit(EventType.attackComplete, this);
        });
    }

    playDeathAnimation()
    {
        this.setTexture(this.deathImageKey);

        this.anims.animationManager.create(
        {
            key: this.name+"_death",
            frames: this.anims.animationManager.generateFrameNumbers(this.deathImageKey, { start: 0, end: Value.DeathFrames }),
            frameRate: Value.DeathFrameRate,
            repeat: 0
        });

        this.play(this.name+"_death");
    }
}
export class Hero extends Character {

    public heroType: HeroType;

    constructor(x: number, y: number, scene: Phaser.Scene, config: CharacterConfig) {
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
        this.battleImageKey = config.battleImageKey;
        this.deathImageKey = config.deathImageKey;
        this.battleAnimationFrames = config.battleAnimationFrames;
        this.battleAnimationFrameRate = config.battleAnimationFrameRate;
        this.gridPosition = config.gridPosition;

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

    constructor(x: number, y: number, scene: Phaser.Scene, config: CharacterConfig) {
        super(scene, x, y, config.imageKey);

        this.name = config.name;
        this.characterType = CharacterType.enemy;
        this.hitpoints = config.hitpoints;
        this.weapon = config.weapon != null
                    ? config.weapon
                    : this.weapon;
        
        this.armor = config.armor != null
                    ? config.armor
                    : this.armor; 
        this.imageKey = config.imageKey;
        this.battleImageKey = config.battleImageKey;
        this.deathImageKey = config.deathImageKey;
        //this.animationFrames = config.animationFrames;
        //this.animationFrameRate = config.animationFrameRate;
        this.battleAnimationFrames = config.battleAnimationFrames;
        this.battleAnimationFrameRate = config.battleAnimationFrameRate;
        this.gridPosition = config.gridPosition;

        this.setScale(-ObjectScale.battleScale, ObjectScale.battleScale);
        this.setDepth(Depth.characterSprite);
    }
}

export type CharacterConfig  = {

    name: string,
    heroType: HeroType,
    hitpoints: number,
    weapon: Weapon | null,
    armor: Armor | null,
    imageKey: string,
    battleImageKey: string,
    deathImageKey: string,
    battleAnimationFrames: number,
    battleAnimationFrameRate: number,
    gridPosition: GridPosition
}

export type EnemyConfig = {

    name: string,
    hitpoints: number,
    imageKey: string,
    battleImageKey: string,
    deathImageKey: string,
    weaponName: string,
    armorName: string,
    gridPosition: number
}