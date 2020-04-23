import { CharacterType, Depth, EventType, 
         ObjectScale, HeroType, ArmorType, 
         WeaponType, GridPosition, SceneType, Value, ElementType, ActionType} from "../../utility/Enumeration";
import { Weapon, Armor } from "../items/Item";
import { Spell } from "../spells_and_abilities/Spell";
import { LimitBurst } from "../spells_and_abilities/Action";

export class Character extends Phaser.Physics.Arcade.Sprite{

    protected imageKey: string;
    protected battleImageKey: string;
    protected castImageKey: string;
    protected deathImageKey: string;
    public characterType: CharacterType;

    protected allowedWeaponType: WeaponType;
    protected allowedArmorType: ArmorType;
    protected maxHealth: number;
    protected maxMP: number;
    protected maxTP: number = Value.MaxTP;
    protected health: number;
    public mp: number;
    public tp: number = 0;
    protected weapon: Weapon;
    protected armor: Armor;
    protected spellBook: Map<string, Spell>
    protected activeSpell: Spell;
    protected lb: LimitBurst;

    public isAttacking: boolean = false;
    public actedThisTurn: boolean = false;
    public isAlive: boolean = true;
    public limitBurstReady: boolean = false;
    public priority: number = 0;

    protected initialX: number;
    protected initialY: number;
    protected castEffectOffset: number;
    public gridPosition: GridPosition;
    protected animationFrames: number;
    protected animationFrameRate: number;
    protected battleAnimationFrames: number;
    protected battleAnimationFrameRate: number;
    protected deathAnimationFrames: number;
    protected deathAnimationFrameRate: number;

    constructor(scene: Phaser.Scene, x: number, y: number, imageKey: string){
        super(scene, x, y, imageKey);
        this.spellBook = new Map<string, Spell>();

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
        this.y = this.initialY;
        this.setDepth(Depth.CharacterSprite);
    }

    learn(action: Spell | LimitBurst)
    {
        if(action.actionType == ActionType.Offense)
            this.spellBook.set(action.name, action);
        else if(action.actionType == ActionType.Special)
            this.lb = action;
    }

    limitBurst()
    {
        this.playCastAnimation(this.lb, undefined);
    }

    cast(spellName: string, target: Character)
    {
        let spell:Spell | undefined = this.spellBook.get(spellName);

        if(spell == undefined)
            throw "Spell "+ "'" +spellName+ "'" +" is undefined";
        else if(spell.mpCost > this.mp)
            throw this.name+" does not have enough mp to cast "+ "'" +spellName+ "'";
        else{
            this.mp -= spell.mpCost;
            this.activeSpell = spell;
            this.playCastAnimation(spell, target);
        }
        return this.activeSpell;
    }

    emitEffectApplied(message: string)
    {
        this.emit(EventType.EffectApplied, message);
    }
    
    finishCast()
    {
        this.setTexture(this.battleImageKey);
        this.resetPosition();
        this.emit(EventType.AttackComplete, this);
    }

    configureAttack()
    {
        this.isAttacking = true;
        this.setDepth(Depth.Attacker);
    }

    getBaseAttack()
    {
        return this.weapon.attackPower;
    }

    getBaseDefense()
    {
        return this.armor.mitigation;
    }

    getCurrentHp()
    {
        return this.health;
    }

    getCurrentMp()
    {
        return this.mp;
    }

    getCurrentTp()
    {
        return this.tp;
    }

    addTP(damage: number)
    {
        this.tp += damage * .10;

        if(this.tp >= this.maxTP)
        {
            this.tp = this.maxTP;
            this.limitBurstReady = true;
        }
    }

    takeDamage(damage: number)
    {
        this.health -= damage;

        if(this.health <= 0)
        {
            this.health = 0;
            this.isAlive = false;
            this.playDeathAnimation();
            this.emit(EventType.CharacterDefeated, this.name + " has been defeated.");
        }
    }

    recoverHealth(health: number)
    {
        this.health += health;
        
        if(this.health > this.maxHealth)
            this.health = this.maxHealth;
    }

    //#region: Animation

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
        
        this.emit(EventType.Attacking);
        this.actedThisTurn = true;

        this.play(this.name+"_attack", true).once("animationcomplete-"+this.name+"_attack", () =>
        {
            this.setFrame(0);
            this.resetPosition();
            this.isAttacking = false;
            this.emit(EventType.AttackComplete, this);
        });
    }

    playCastAnimation(spell: Spell | LimitBurst, target?: Character)
    {
        if(this.actedThisTurn)
            return;

        this.actedThisTurn = true;
        this.setTexture(this.castImageKey);
        
        spell.emitter.on(EventType.CastComplete, this.finishCast, this);

        this.anims.animationManager.create(
        {
            key: this.name+"_cast",
            frames: this.anims.animationManager.generateFrameNumbers(this.castImageKey, { start: 0, end: Value.CastFrames }),
            frameRate: Value.CastFrameRate,
            repeat: 0
        });

        this.playCastAnimationEffect();

        this.play(this.name+"_cast", true).once("animationcomplete-"+this.name+"_cast", () =>
        {
            spell.playAnimation(this.scene, target);
            this.isAttacking = false;
        });
    }

    playCastAnimationEffect()
    {
        let castAnimation: Phaser.Physics.Arcade.Sprite = new Phaser.Physics.Arcade.Sprite(this.scene, this.x + this.castEffectOffset, this.y + 20, "cast_white");

        this.scene.add.existing(castAnimation);
        castAnimation.setDepth(Depth.Effect);
        castAnimation.setScale(ObjectScale.castAnimation);
        
        castAnimation.anims.animationManager.create(
        {
            key: "cast",
            frames: castAnimation.anims.animationManager.generateFrameNumbers("cast_white", { start: 0, end: Value.SpellFrames }),
            frameRate: Value.SpellFrameRate,
            repeat: 1
        });

        castAnimation.play("cast", true).once("animationcomplete-"+"cast", () =>{
            castAnimation.destroy();
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

    //#endregion
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

        this.maxHealth = this.health = config.health;
        this.maxMP = this.mp = Value.StartingPlayerMP;
        this.imageKey = config.imageKey;
        this.battleImageKey = config.battleImageKey;
        this.deathImageKey = config.deathImageKey;
        this.castImageKey = config.castImageKey;
        this.battleAnimationFrames = config.battleAnimationFrames;
        this.battleAnimationFrameRate = config.battleAnimationFrameRate;
        this.gridPosition = config.gridPosition;

        this.castEffectOffset = Value.CastEffectOffset;

        this.determineEquipmentTypes();

        this.setScale(ObjectScale.battle, ObjectScale.battle);
        this.setDepth(Depth.CharacterSprite);
    }

    determineEquipmentTypes()
    {
        switch (this.heroType) {
            case HeroType.Melee:
                this.allowedWeaponType = WeaponType.Melee;
                this.allowedArmorType = ArmorType.Heavy;
                break;
            case HeroType.Magic:
                this.allowedWeaponType = WeaponType.Magic;
                this.allowedArmorType = ArmorType.Robe;
                break;
            case HeroType.Ranged:
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
        this.maxHealth = this.health = config.health;
        this.maxMP = this.mp = Value.MaxEnemyMP;
        this.weapon = config.weapon != null
                    ? config.weapon
                    : this.weapon;
        
        this.armor = config.armor != null
                    ? config.armor
                    : this.armor; 
        this.imageKey = config.imageKey;
        this.battleImageKey = config.battleImageKey;
        this.deathImageKey = config.deathImageKey;
        this.castImageKey = config.castImageKey;
        this.battleAnimationFrames = config.battleAnimationFrames;
        this.battleAnimationFrameRate = config.battleAnimationFrameRate;
        this.gridPosition = config.gridPosition;

        this.castEffectOffset = -Value.CastEffectOffset;

        this.setScale(-ObjectScale.battle, ObjectScale.battle);
        this.setDepth(Depth.CharacterSprite);
    }
}

export type CharacterConfig  = {

    name: string,
    heroType: HeroType,
    health: number,
    weapon: Weapon | null,
    armor: Armor | null,
    imageKey: string,
    battleImageKey: string,
    deathImageKey: string,
    castImageKey: string,
    battleAnimationFrames: number,
    battleAnimationFrameRate: number,
    gridPosition: GridPosition
}

export type EnemyConfig = {

    name: string,
    health: number,
    imageKey: string,
    battleImageKey: string,
    deathImageKey: string,
    castImageKey: string,
    weaponName: string,
    armorName: string,
    gridPosition: number
}