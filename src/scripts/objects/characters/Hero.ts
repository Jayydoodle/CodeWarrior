import { CharacterType, Depth, EventType, 
         ObjectScale, HeroType, ArmorType, 
         WeaponType, GridPosition, SceneType, Value, ElementType, ActionType, AttackType} from "../../utility/Enumeration";
import { Weapon, Armor } from "../items/Item";
import { Spell } from "../spells_and_abilities/Spell";
import { LimitBurst } from "../spells_and_abilities/Action";
import { BattleParty, EnemyParty } from "./Party";

export class Character extends Phaser.Physics.Arcade.Sprite{

    protected imageKey: string;
    protected battleImageKey: string;
    protected castImageKey: string;
    protected deathImageKey: string;
    public characterType: CharacterType;
    public heroType: HeroType;

    protected allowedWeaponType: WeaponType;
    protected allowedArmorType: ArmorType;
    protected maxHealth: number;
    protected maxMP: number;
    protected maxTP: number = Value.MaxTP;
    protected health: number;
    protected weapon: Weapon;
    protected armor: Armor;
    protected spellBook: Map<string, Spell>
    protected lb: LimitBurst;
    public currentAttackType: AttackType;
    public activeSpell: Spell;
    public mp: number;
    public tp: number = 0;

    public isAttacking: boolean = false;
    public actedThisTurn: boolean = false;
    public isAlive: boolean = true;
    public isLimitBursting = false;
    public priority: number = 0;

    protected initialX: number;
    protected initialY: number;
    protected castEffectOffset: number;
    protected animationFrames: number;
    protected animationFrameRate: number;
    protected battleAnimationFrames: number;
    protected battleAnimationFrameRate: number;
    protected deathAnimationFrames: number;
    protected deathAnimationFrameRate: number;
    public gridPosition: GridPosition;

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
        if(action instanceof LimitBurst)
            this.lb = action as LimitBurst;
        else
            this.spellBook.set(action.name, action);
    }

    limitBurst(enemyParty: EnemyParty, playerParty:BattleParty)
    {
        if(this.lb.actionType == ActionType.Offense)
            this.playCastAnimation(this.lb, enemyParty);
        else
            this.playCastAnimation(this.lb, playerParty);

        this.tp = 0;
    }

    cast(spellName: string, target: Character)
    {
        let spell:Spell | undefined = this.spellBook.get(spellName);

        if(spell == undefined)
            throw "Spell "+ "'" +spellName+ "'" +" is undefined or has not been learned";
        else if(spell.mpCost > this.mp)
            throw this.name+" does not have enough mp to cast "+ "'" +spellName+ "'";
        else{
            this.mp -= spell.mpCost;
            this.activeSpell = spell;
            this.playCastAnimation(spell, target);
        }
    }

    emitEffectApplied(message: string)
    {
        this.emit(EventType.EffectApplied, message);
    }

    emitRevived()
    {
        this.emit(EventType.Revived, this);
    }
    
    finishCast()
    {
        this.isLimitBursting = false;
        this.setTexture(this.battleImageKey);
        this.emit(EventType.AttackComplete, this);
    }

    configureAttack()
    {
        this.isAttacking = true;
        this.setDepth(Depth.Attacker);
        this.currentAttackType = AttackType.Regular;
    }

    configureCast()
    {
        this.setDepth(Depth.Cast);
        this.currentAttackType = AttackType.Cast;
    }

    configureLimitBurst()
    {
        this.isLimitBursting = true;
        this.setDepth(Depth.Cast);
        this.currentAttackType = AttackType.LimitBurst;
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

    getSpellType()
    {
        return this.activeSpell.actionType;
    }

    limitBurstReady()
    {
        return this.tp >= 100 ? true : false;
    }

    addTP(damage: number)
    {
        this.tp += damage * .3;

        if(this.tp >= this.maxTP)
        {
            this.tp = this.maxTP;
        }
    }

    takeDamage(damage: number)
    {
        this.health -= damage;

        if(this.health <= 0)
        {
            this.health = 0;
            this.isAlive = false;
        }
    }

    recoverHealth(health: number)
    {
        this.health += health;
        
        if(this.health > this.maxHealth)
            this.health = this.maxHealth;
    }

    revive()
    {
        this.health = this.maxHealth;
        this.setTexture(this.battleImageKey);
        this.isAlive = true;
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
            this.isAttacking = false;
            this.emit(EventType.AttackComplete, this);
        });
    }

    playCastAnimation(spell: Spell | LimitBurst, target: Character | BattleParty | EnemyParty)
    {
        if(this.actedThisTurn)
            return;

        this.actedThisTurn = true;
        this.setTexture(this.castImageKey);
        this.setDepth(Depth.Cast);
        
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
        this.emit(EventType.CharacterDefeated, this.name + " has been defeated.");
    }

    //#endregion
}
export class Hero extends Character {

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
        this.heroType = config.heroType;
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
    class: HeroType,
    battleImageKey: string,
    deathImageKey: string,
    castImageKey: string,
    weaponName: string,
    armorName: string,
    gridPosition: number
}