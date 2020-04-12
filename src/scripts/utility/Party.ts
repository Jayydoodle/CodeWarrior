import { Hero } from "../objects/characters/Hero";
import { EventType } from "./Enumeration";

export class Party{

    group: Hero[] = [];
    warrior: Hero;
    mage: Hero;
    ranger: Hero;

    constructor(warrior: Hero, mage: Hero, ranger: Hero)
    {
        this.warrior = warrior;
        this.mage = mage;
        this.ranger = ranger;

        this.group[0] = this.warrior;
        this.group[1] = this.mage;
        this.group[2] = this.ranger;
    }

    addToScene(){
        this.group.forEach(member =>{
            member.addToScene();
        });
    }

    changeScene(scene: Phaser.Scene){
        this.group.forEach(member => {
            member.changeScene(scene);
        })
    }
}
export class BattleParty extends Party{

    public emitter: Phaser.Events.EventEmitter;

    constructor(warrior: Hero, mage: Hero, ranger: Hero)
    {
        super(warrior, mage, ranger);
        this.emitter = new Phaser.Events.EventEmitter();
        this.warrior.on(EventType.attacking, this.emitAttackComplete, this);
        this.mage.on(EventType.attacking, this.emitAttackComplete, this);
        this.ranger.on(EventType.attacking, this.emitAttackComplete, this);
    }

    memberIsAttacking()
    {
        return this.warrior.isAttacking || this.mage.isAttacking || this.ranger.isAttacking;
    }

    setInitialPositions()
    {
        this.warrior.setInitialPosition();
        this.mage.setInitialPosition();
        this.ranger.setInitialPosition();
    }

    emitAttackComplete()
    {
        this.emitter.emit(EventType.attacking);
    }

    static createFromParty(party: Party)
    {
        return new BattleParty(party.warrior, party.mage, party.ranger);
    }


}