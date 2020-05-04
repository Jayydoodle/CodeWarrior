import { CharacterType, Depth, EventType, 
         ObjectScale, HeroType, ArmorType, 
         WeaponType, GridPosition, SceneType, Value, ElementType, ActionType, AttackType, FrameRate, EffectType} from "../../utility/Enumeration";
import { Weapon, Armor } from "../items/Item";
import { Spell } from "../spells_and_abilities/Spell";
import { LimitBurst } from "../spells_and_abilities/Action";
import { BattleParty, EnemyParty, Party } from "./Party";
import { Effect } from "../spells_and_abilities/Effect";

export class Character extends Phaser.Physics.Arcade.Sprite{

    protected imageKey: string;
    protected battleImageKey: string;
    protected castImageKey: string;
    protected deathImageKey: string;
    public characterType: CharacterType;
    public heroType: HeroType;
    public config: CharacterConfig;

    protected allowedWeaponType: WeaponType;
    protected allowedArmorType: ArmorType;
    protected maxHealth: number;
    protected maxMP: number;
    protected maxTP: number = Value.MaxTP;
    protected health: number;
    protected weapon: Weapon;
    protected armor: Armor;
    protected spellBook: Map<string, Spell>
    public statusEffects: Map<EffectType, Effect>
    public currentAttackType: AttackType;
    public activeSpell: Spell;
    protected lb: LimitBurst;
    public mp: number;
    public tp: number = 0;
    public priority: number = 0;

    public isAttacking: boolean = false;
    public actedThisTurn: boolean = false;
    public isLimitBursting = false;
    public isAlive: boolean = true;
    public isAsleep: boolean = false;
    public isBlinded: boolean = false;
    public isConfused: boolean = false;
    public isCursed: boolean = false;

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

    constructor(scene: Phaser.Scene, x: number, y: number, config: CharacterConfig){
        super(scene, x, y, config.imageKey);
        this.spellBook = new Map<string, Spell>();
        this.statusEffects = new Map<EffectType, Effect>();
        this.config = config;

        this.name = config.name;
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
        this.imageKey = config.imageKey;
        this.battleImageKey = config.battleImageKey;
        this.deathImageKey = config.deathImageKey;
        this.castImageKey = config.castImageKey;
        this.battleAnimationFrames = config.battleAnimationFrames;
        this.battleAnimationFrameRate = config.battleAnimationFrameRate;
        this.gridPosition = config.gridPosition;
        
        this.setDepth(Depth.CharacterSprite);
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
        this.currentAttackType = AttackType.None;
    }

    learn(action: Spell | LimitBurst)
    {
        if(action instanceof LimitBurst)
            this.lb = action as LimitBurst;
        else
            this.spellBook.set(action.name, action);
    }

    limitBurst(enemyParty: Party, party:Party)
    {
        if(this.lb.actionType == ActionType.Offense)
            this.playCastAnimation(this.lb, enemyParty);
        else
            this.playCastAnimation(this.lb, party);

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
            this.configureCast();
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
        this.tp += Math.floor(damage * .05);

        if(this.tp >= this.maxTP)
        {
            this.tp = this.maxTP;
        }
    }

    takeDamage(damage: number)
    {
        this.playDamageEffect();

        this.health -= damage;

        if(this.health <= 0)
        {
            this.health = 0;
            this.isAlive = false;
            this.playDeathAnimation();
        }
    }

    addStatusEffect(effectType: EffectType, effect: Effect)
    {
        this.statusEffects.set(effectType, effect);

        if(this.characterType == CharacterType.player)
            this.emit(EventType.EffectsUpdated, this);
    }

    removeStatusEffects()
    {
        this.statusEffects.forEach(effect => {
            effect.removeAilment(this);
            this.statusEffects.delete(effect.effectType);
        });
    }

    handleStatusEffects()
    {
        let previousSize = this.statusEffects.size;

        this.statusEffects.forEach(effect => {
            
            effect.handleEffect(this);

            if(effect.duration <= 0){
                effect.removeAilment(this);
                this.statusEffects.delete(effect.effectType);
                this.emit(EventType.EffectsUpdated, this);
            }
        });

        if(this.statusEffects.size < previousSize && this.characterType == CharacterType.player)
            this.emit(EventType.EffectsUpdated, this);
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

    reset()
    {
        this.health = this.maxHealth;
        this.mp = this.maxMP;
        this.tp = 0;
        this.isAlive = true;
        this.actedThisTurn = false;
        this.isAttacking = false;
        this.isLimitBursting = false;
        
        this.removeStatusEffects();
    }

    //#region: Animation

    playAttackAnimation(target: Character)
    {
        if(this.actedThisTurn)
            return;

        this.actedThisTurn = true;
            
        let attackAnimation = this.anims.animationManager.create(
        {
            key: this.name+"_attack",
            frames: this.anims.animationManager.generateFrameNumbers(this.battleImageKey, { start: 0, end: this.battleAnimationFrames }),
            frameRate: this.battleAnimationFrameRate,
            repeat: 0
        }) as Phaser.Animations.Animation;

        this.on("animationupdate-"+attackAnimation.key, () =>
        {
            if(this.frame === attackAnimation.getFrameByProgress(0.75).frame)
                this.playAttackAnimationEffect(target);
        });

        this.play(attackAnimation.key, true).once("animationcomplete-"+attackAnimation.key, () =>
        {
            this.setFrame(0);
            this.isAttacking = false;
            this.emit(EventType.AttackComplete, this);
            this.removeListener("animationupdate-"+attackAnimation.key);
        });
    }

    playAttackAnimationEffect(target: Character)
    {
        let attackEffect = new Phaser.Physics.Arcade.Sprite(this.scene, target.x, target.y, this.weapon.effectKey);

        this.scene.add.existing(attackEffect);
        attackEffect.setDepth(Depth.Effect);

        if(this.characterType == CharacterType.player)
            attackEffect.setScale(ObjectScale.Ability);
        else
            attackEffect.setScale(-ObjectScale.Ability);
        
        let effectAnimation = attackEffect.anims.animationManager.create(
        {
            key: this.name+"_attackEffect",
            frames: attackEffect.anims.animationManager.generateFrameNumbers(this.weapon.effectKey, { start: 0, end: this.weapon.effectFrames }),
            frameRate: FrameRate.Ability,
            repeat: 0
        }) as Phaser.Animations.Animation;

        attackEffect.play(effectAnimation.key, true).once("animationcomplete-"+effectAnimation.key, () =>{
            attackEffect.destroy();
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

        let castAnimation = this.anims.animationManager.create(
        {
            key: this.name+"_cast",
            frames: this.anims.animationManager.generateFrameNumbers(this.castImageKey, { start: 0, end: Value.CastFrames }),
            frameRate: FrameRate.Cast,
            repeat: 0
        }) as Phaser.Animations.Animation;

        if(this.currentAttackType != AttackType.LimitBurst)
            this.playCastAnimationEffect();

        this.play(castAnimation.key, true).once("animationcomplete-"+castAnimation.key, () =>
        {
            spell.playAnimation(this.scene, target);
            this.isAttacking = false;
        });
    }

    playCastAnimationEffect()
    {
        let castEffect = new Phaser.Physics.Arcade.Sprite(this.scene, this.x + this.castEffectOffset, this.y + 20, "cast_white");

        this.scene.add.existing(castEffect);
        castEffect.setDepth(Depth.Effect);
        castEffect.setScale(ObjectScale.CastAnimation);
        
        let effectAnimation = castEffect.anims.animationManager.create(
        {
            key: "cast",
            frames: castEffect.anims.animationManager.generateFrameNumbers("cast_white", { start: 0, end: Value.SpellFrames }),
            frameRate: FrameRate.Spell,
            repeat: 0
        }) as Phaser.Animations.Animation;

        castEffect.play(effectAnimation.key, true).once("animationcomplete-"+effectAnimation.key, () =>{
            castEffect.destroy();
        });
    }

    playDamageEffect()
    {
        var target = this;
        let c1 = Phaser.Display.Color.HexStringToColor('#ffffff'); // From no tint
        let c2 = Phaser.Display.Color.HexStringToColor('#000000'); // To black
  
        this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 80,
            onUpdate: function(tween){
                let color = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100, tween.getValue());
                target.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
            },
            yoyo: true,
            repeat: 1
        });
    }

    playDeathAnimation()
    {
        this.setTexture(this.deathImageKey);

        let deathAnimation = this.anims.animationManager.create(
        {
            key: this.name+"_death",
            frames: this.anims.animationManager.generateFrameNumbers(this.deathImageKey, { start: 0, end: Value.DeathFrames }),
            frameRate: FrameRate.Death,
            repeat: 0
        }) as Phaser.Animations.Animation;

        this.play(deathAnimation.key).once("animationcomplete-"+deathAnimation.key, () =>{
            
            this.emit(EventType.CharacterDefeated, this.name + " has been defeated.");
        });
    }

    //#endregion
}
export class Hero extends Character {

    constructor(x: number, y: number, scene: Phaser.Scene, config: CharacterConfig) {
        super(scene, x, y, config);

        this.ignoreDestroy = true;
        this.characterType = CharacterType.player;
        this.maxMP = this.mp = Value.StartingPlayerMP;

        this.castEffectOffset = Value.CastEffectOffset;

        this.determineEquipmentTypes();

        this.setScale(ObjectScale.Battle, ObjectScale.Battle);
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
        super(scene, x, y, config);

        this.characterType = CharacterType.enemy;
        this.maxMP = this.mp = Value.MaxEnemyMP;

        this.castEffectOffset = Value.CastEffectOffset;

        this.setScale(ObjectScale.Battle + 0.5, ObjectScale.Battle + 0.5);
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