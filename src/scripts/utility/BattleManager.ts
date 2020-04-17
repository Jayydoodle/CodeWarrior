import { BattleParty } from "./Party";
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

    private attackOffset: number = 300;
    private movementSpeed: number = 3000;
    private attackDelay: number = AttackDelay.none;

    private battleParty: BattleParty;
    private enemy: Enemy;
    private currentTarget: Hero;
    private currentAttacker: Character;

    private queue: Queue<Character>;

    constructor(scene: Phaser.Scene, battleParty: BattleParty, enemy: Enemy)
    {
        this.scene = scene;
        this.battleParty = battleParty;
        this.enemy = enemy;

       /* this.queue = new TypedPriorityQueue<Character>
        (function(a: Character, b: Character){ return a.priority > b.priority });*/

        this.queue = new Queue();
        this.consoleLogger = new ConsoleLogger();

        this.battleParty.group.forEach(member => {
            this.queue.enqueue(member);
        });

        this.queue.enqueue(enemy);

        //this.enemy.on(EventType.attacking, this.reset, this);
        this.enemy.on(EventType.attackComplete, this.nextTurn, this);

        //this.battleParty.emitter.on(EventType.attacking, this.reset, this);
        this.battleParty.emitter.on(EventType.playerAttackComplete, this.nextTurn, this);
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

    startBattle(code)
    {
        this.code = code;
        this.currentAttacker = this.queue.dequeue() as Character;

        
        this.handleTurn();
    }

    handleTurn()
    {
        if(this.currentAttacker.characterType == CharacterType.player){
            
            try {
                eval(this.code); 
            } catch (e) {
                
              this.consoleLogger.log(this.turnCount, Message.SyntaxError);
              this.nextTurn();
              //return;
            }
        }
        else{
            this.determineTarget();
            this.meleeAttack(this.enemy, this.currentTarget);
            this.consoleLogger.logAttack(this.turnCount, this.enemy.name, this.currentTarget.name, "100");
        }
    }

    nextTurn()
    {
        var previousAttacker = this.currentAttacker;
        previousAttacker.actedThisTurn = false;
        this.battleParty.warrior.actedThisTurn = false;

        this.currentAttacker = this.queue.dequeue() as Character;
        this.queue.enqueue(previousAttacker);
        
        this.turnCount++;

        this.timer = this.scene.time.delayedCall(this.attackDelay, this.handleTurn, [], this);
    }

    determineTarget()
    {
        var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);

        this.currentTarget = this.battleParty.group[random];
    }

    enemyIsAttacking()
    {
       return (this.battleParty.warrior.x <= this.enemy.x + this.attackOffset)
                && this.enemy.isAttacking && !this.enemy.actedThisTurn
                ? true : false;
    }

    warriorIsAttacking()
    {
        return (this.battleParty.warrior.x <= this.enemy.x + this.attackOffset) 
                && this.battleParty.warrior.isAttacking && !this.battleParty.warrior.actedThisTurn
                ? true : false;
    }

    getTurnCount(){

        return this.turnCount;
    }

    meleeAttack(attacker: Character, target: Character | null)
    {
        attacker.isAttacking = true;
        this.scene.physics.moveToObject(attacker, target as Character, this.movementSpeed);
    }

    attack(enemy: Enemy)
    {
        if(enemy == null)
        {
            this.nextTurn();
            return;
        }
        
        let currentHero = this.currentAttacker as Hero;

        if(currentHero.heroType == HeroType.Warrior)
        {
            this.meleeAttack(currentHero, enemy);
        }
        else{
            currentHero.PlayAttackAnimation();
        }

        this.consoleLogger.logAttack(this.turnCount, currentHero.name, enemy.name, "100");
    }
}