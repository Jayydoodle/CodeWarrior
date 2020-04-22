import { Hero, Enemy, Character } from "./Hero";
import { EventType, SceneType } from "../../utility/Enumeration";

export class Party{

    public emitter: Phaser.Events.EventEmitter;
    group: Character[] = [];

    constructor()
    {
        this.emitter = new Phaser.Events.EventEmitter();
    }

    addToScene(sceneType: SceneType){
        this.group.forEach(member =>{
            member.addToScene(sceneType);
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

    emitAttacking()
    {
        this.emitter.emit(EventType.Attacking)
    }

    emitAttackComplete()
    {
        this.emitter.emit(EventType.AttackComplete);
    }

    emitEffectApplied(message: string)
    {
        this.emitter.emit(EventType.EffectApplied, message);
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

        this.group.forEach(member =>{
            member.on(EventType.Attacking, this.emitAttacking, this);
            member.on(EventType.AttackComplete, this.emitAttackComplete, this);
            member.on(EventType.EffectApplied, this.emitEffectApplied, this);
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

        this.group.forEach(member =>{
            member.on(EventType.Attacking, this.emitAttacking, this);
            member.on(EventType.AttackComplete, this.emitAttackComplete, this);
            member.on(EventType.EffectApplied, this.emitEffectApplied, this);
        });
    }
}