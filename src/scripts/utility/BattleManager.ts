import { BattleParty, EnemyParty } from "./Party";
import { Character, Hero, Enemy } from "../objects/characters/Hero";
import { CharacterType, EventType, AttackDelay, HeroType, Message } from "./Enumeration";
import { TypedPriorityQueue } from "../../../node_modules/typedpriorityqueue";
import { Queue } from "../../../node_modules/queue-typescript";
import { ConsoleLogger } from "./ConsoleLogger";

export class BattleManager{

    private scene: Phaser.Scene;
    private timer: Phaser.Time.TimerEvent;
    private consoleLogger: ConsoleLogger;
    private turnCount: number = 1;
    private code: string;
    private functionCalled: boolean;

    private playerAttackOffset: number = 300;
    private enemyAttackOffset: number = -300;
    private movementSpeed: number = 3000;
    private attackDelay: number = AttackDelay.none;

    private battleParty: BattleParty;
    private enemyParty: EnemyParty;
    private firstAttacker: Character;
    private currentTarget: Character;
    private currentAttacker: Character;

    private queue: Queue<Character>;

    constructor(scene: Phaser.Scene, battleParty: BattleParty, enemyParty: EnemyParty)
    {
        this.scene = scene;
        this.battleParty = battleParty;
        this.enemyParty = enemyParty;

       /* this.queue = new TypedPriorityQueue<Character>
        (function(a: Character, b: Character){ return a.priority > b.priority });*/

        this.queue = new Queue();
        this.consoleLogger = new ConsoleLogger();

        this.battleParty.group.forEach(member => {
            this.queue.enqueue(member);
        });

        this.enemyParty.group.forEach(member => {
            this.queue.enqueue(member);
        });

        //this.enemy.on(EventType.attacking, this.reset, this);
        this.enemyParty.emitter.on(EventType.attackComplete, this.nextTurn, this);

        //this.battleParty.emitter.on(EventType.attacking, this.reset, this);
        this.battleParty.emitter.on(EventType.attackComplete, this.nextTurn, this);
    }

    update()
    {
        if(this.currentAttacker != null && this.isMeleeAttacker()){
            this.currentAttacker.body.velocity.setTo(0, 0);
            this.currentAttacker.PlayAttackAnimation();
        }
    }

    startBattle(code)
    {
        this.code = code;

        if(this.currentAttacker == null){
            this.currentAttacker = this.queue.dequeue() as Character;
            this.firstAttacker = this.currentAttacker;
            this.currentTarget = this.enemyParty.group[0]; // default target
        }
        else
            return;

        this.handleTurn();
    }

    handleTurn()
    {
        this.functionCalled = false;

        var isPlayer = this.currentAttacker.characterType == CharacterType.player;
        
        if(isPlayer){

            try {
                eval(this.code); 
            } catch (e) {
                
              this.consoleLogger.logTurn(this.turnCount, Message.SyntaxError);
            }
        }
        else{
            this.currentTarget = this.determineTarget(this.battleParty.group);
            this.meleeAttack(this.currentAttacker, this.currentTarget);
            this.consoleLogger.logAttack(this.turnCount, this.currentAttacker.name, this.currentTarget.name, 100);
        }

        if(isPlayer && !this.functionCalled)
        {
            this.consoleLogger.logTurn(this.turnCount, Message.SyntaxError);
            this.nextTurn();
        }
            
    }

    nextTurn()
    {
        if(this.currentTarget && !this.currentTarget.isAlive)
        {
            this.currentTarget.playDeathAnimation();
        }

        if(this.enemyParty.hasBeenDefeated() || this.battleParty.hasBeenDefeated()) return;
        
        var previousAttacker = this.currentAttacker;
        previousAttacker.actedThisTurn = false;

        this.currentAttacker = this.queue.dequeue() as Character;
        this.queue.enqueue(previousAttacker);

        while(!this.currentAttacker.isAlive)
        {
            this.currentAttacker = this.queue.dequeue() as Character;
        }
        
        if(this.currentAttacker.name == this.firstAttacker.name)
        {
            this.turnCount++;
            this.consoleLogger.log("<br>Turn: " + this.turnCount);
        }

        this.timer = this.scene.time.delayedCall(this.attackDelay, this.handleTurn, [], this);
    }

    getTurnCount(){

        return this.turnCount;
    }

    determineTarget(targetParty: Character[])
    {
        let target: Character

        var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        target = targetParty[random];

        while(!target.isAlive)
        {
            var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            target = targetParty[random];
        }

        return target;
    }

    calculateDamage(attacker: Character, target: Character)
    {
        return attacker.getBaseAttack() - target.getBaseDefense();
    }

    isMeleeAttacker()
    {
        switch(this.currentAttacker.characterType)
        {
            case CharacterType.player:
                return (this.currentAttacker.x <= this.currentTarget.x + this.playerAttackOffset) 
                && this.currentAttacker.isAttacking && !this.currentAttacker.actedThisTurn
                ? true : false;
            
            case CharacterType.enemy:
                return (this.currentAttacker.x >= this.currentTarget.x + this.enemyAttackOffset) 
                && this.currentAttacker.isAttacking && !this.currentAttacker.actedThisTurn
                ? true : false;
        }
    }

    meleeAttack(attacker: Character, target: Character | null)
    {
        attacker.configureAttack();
        this.scene.physics.moveToObject(attacker, target as Character, this.movementSpeed);
    }

    checkTarget(name: String, type: CharacterType)
    {

        let target: Character | undefined;

        switch(type)
        {
            case CharacterType.player:
                this.battleParty.group.forEach( member => {
                    if(member.name === name) target = member;
                });
            
            case CharacterType.enemy:
                this.enemyParty.group.forEach( member => {
                    if(member.name === name) target = member;
                });
        }

        if(name === "random")
            target = this.determineTarget(this.enemyParty.group);

        return target;
    }

    attack(enemyName: String)
    {
        if(this.functionCalled)
        {
            return;
        }
        
        let target = this.checkTarget(enemyName, CharacterType.enemy);

        if(!target)
        {
            return;
        }

        if(!target.isAlive)
        {
            return;
        }
        
        let currentHero = this.currentAttacker as Hero;
        this.currentTarget = target;

        if(currentHero.heroType == HeroType.Warrior)
        {
            this.meleeAttack(currentHero, this.currentTarget);
        }
        else{
            currentHero.PlayAttackAnimation();
        }

        let damage = this.calculateDamage(currentHero, this.currentTarget);
        this.currentTarget.takeDamage(damage);

        this.consoleLogger.logAttack(this.turnCount, currentHero.name, this.currentTarget.name, damage);

        this.functionCalled = true;
    }
}