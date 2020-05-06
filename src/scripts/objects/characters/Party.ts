import { Hero, Enemy, Character } from "./Hero";
import { EventType, SceneType } from "../../utility/Enumeration";

export class Party{

    public emitter: Phaser.Events.EventEmitter;
    group: Character[] = [];
    names: string[] = [];

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
    }

    addToScene(sceneType: SceneType){
        this.group.forEach(member =>{
            member.addToScene(sceneType);
        });
    }

    addMemberNames()
    {
        this.group.forEach(member =>{
            this.names.push(member.name);
        });
    }

    changeScene(scene: Phaser.Scene){
        this.group.forEach(member => {
            member.changeScene(scene);
        })
    }

    memberIsAttacking()
    {
        this.group.forEach( member => {

            if(member.isAttacking) { return true; }
        });

        return false;
    }

    hasBeenDefeated()
    {
        let hasBeenDefeated:boolean = true;

        this.group.forEach( member => {

            if(member.isAlive) { hasBeenDefeated = false; }
        });

        return hasBeenDefeated;
    }

    setInitialPositions()
    {
        this.group.forEach( member => {

            member.setInitialPosition();
        });
    }

    setEmitters()
    {
        this.group.forEach(member =>{
            member.on(EventType.AttackComplete, this.emitAttackComplete, this);
            member.on(EventType.EffectApplied, this.emitEffectApplied, this);
            member.on(EventType.CharacterDefeated, this.emitCharacterDefeated, this);
            member.on(EventType.Revived, this.emitRevived, this);
        });
    }

    reset()
    {
        this.group.forEach(member =>{
            member.reset();
        })
    }

    emitAttackComplete()
    {
        this.emitter.emit(EventType.AttackComplete);
    }

    emitCharacterDefeated(message: string)
    {
        this.emitter.emit(EventType.CharacterDefeated, message);

        if(this.hasBeenDefeated())
        {
            this.emitter.emit(EventType.PartyDefeated);
            this.emitter.removeAllListeners(EventType.PartyDefeated);
        }
    }

    emitEffectApplied(message: string)
    {
        this.emitter.emit(EventType.EffectApplied, message);
    }

    emitEffectUpdated(character: Character)
    {
        this.emitter.emit(EventType.EffectsUpdated, character);
    }

    emitRevived(character: Character)
    {
        this.emitter.emit(EventType.Revived, character);
    }
}
export class BattleParty extends Party{

    warrior: Hero;
    mage: Hero;
    ranger: Hero;

    constructor(warrior: Hero, mage: Hero, ranger: Hero)
    {
        super();

        this.group[0] = this.warrior = warrior;
        this.group[1] = this.mage = mage;
        this.group[2] = this.ranger = ranger;

        this.setEmitters();
        this.addMemberNames();

        this.group.forEach(member =>{
            member.on(EventType.EffectsUpdated, this.emitEffectUpdated, this);
        });
    }
}

export class EnemyParty extends Party{

    public emitter: Phaser.Events.EventEmitter;

    constructor(enemies: Enemy[])
    {
        super();
        this.emitter = new Phaser.Events.EventEmitter();

        this.group = enemies;

        this.setEmitters();
        this.addMemberNames();
    }
}