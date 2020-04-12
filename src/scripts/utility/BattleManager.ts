import { BattleParty } from "./Party";
import { Enemy } from "../objects/characters/Hero";
import { EventType, AttackDelay } from "./Enumeration";

export class BattleManager{

    private scene: Phaser.Scene;
    private timer: Phaser.Time.TimerEvent;

    private attackOffset: number = 300;
    private movementSpeed: number = 3000;
    private enemyAttackDelay: number = AttackDelay.veryFast;

    private battleParty: BattleParty;
    private enemy: Enemy;
    private currentTarget: Enemy;

    constructor(scene: Phaser.Scene, battleParty: BattleParty, enemy: Enemy)
    {
        this.scene = scene;
        this.battleParty = battleParty;
        this.enemy = enemy;

        this.timer = this.scene.time.delayedCall(this.enemyAttackDelay, this.attack, [], this);
        this.enemy.on(EventType.attacking, this.reset, this);
        this.battleParty.emitter.on(EventType.attacking, this.reset, this);
    }

    update()
    {
        if(this.enemyIsAttacking()){
            this.enemy.body.velocity.setTo(0, 0);
            this.enemy.PlayAttackAnimation();
        }
        
        if(this.warriorIsAttacking()){
            this.battleParty.warrior.body.velocity.setTo(0, 0);
            this.battleParty.warrior.PlayAttackAnimation();
        }
    }

    determineTarget()
    {
        var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);

        this.currentTarget = this.battleParty.group[random];
    }

    enemyIsAttacking()
    {
       return (this.battleParty.warrior.x <= this.enemy.x + this.attackOffset)
                && this.enemy.isAttacking 
                ? true : false;
    }

    warriorIsAttacking()
    {
        return (this.battleParty.warrior.x <= this.enemy.x + this.attackOffset) 
                && this.battleParty.warrior.isAttacking
                ? true : false;
    }

    getElapsedTime(){

        return this.timer.getElapsedSeconds().toFixed().toString();
    }

    prepareAttack(){
    
        // TODO: this.enemyAttackDelay to be different depending on the question asked
        this.timer = this.scene.time.delayedCall(this.enemyAttackDelay, this.attack, [], this);
    }

    attack(){

        this.determineTarget();
        this.enemy.isAttacking = true;
        this.scene.physics.moveToObject(this.enemy, this.currentTarget, this.movementSpeed);
    }

    playerAttack(){

        if(!this.enemyIsAttacking())
        {
            this.battleParty.warrior.isAttacking = true;
            this.scene.physics.moveToObject(this.battleParty.warrior, this.enemy, this.movementSpeed);
        }
    }
    reset(){

        this.timer.destroy();
        this.prepareAttack();
    }
}