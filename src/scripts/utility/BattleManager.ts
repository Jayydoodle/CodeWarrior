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
    private functionCalled: boolean;

    private playerAttackOffset: number = 300;
    private enemyAttackOffset: number = -300;
    private movementSpeed: number = 3000;
    private attackDelay: number = AttackDelay.none;

    private battleParty: BattleParty;
    private enemy: Enemy;
    private currentTarget: Character;
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
        if(this.currentAttacker != null && this.isMeleeAttacker()){
            this.currentAttacker.body.velocity.setTo(0, 0);
            this.currentAttacker.PlayAttackAnimation();
        }
    }

    startBattle(code)
    {
        this.code = code;

        if(this.currentAttacker == null)
            this.currentAttacker = this.queue.dequeue() as Character;
        else
            return;

        this.handleTurn();
    }

    handleTurn()
    {
        this.functionCalled = false;

        var isPlayer = this.currentAttacker.characterType == CharacterType.player;
        
        if(isPlayer){

            this.currentTarget = this.enemy;
            
            try {
                eval(this.code); 
            } catch (e) {
                
              this.consoleLogger.log(this.turnCount, Message.SyntaxError);
            }
        }
        else{
            this.determineTarget();
            this.meleeAttack(this.currentAttacker, this.currentTarget);
            this.consoleLogger.logAttack(this.turnCount, this.enemy.name, this.currentTarget.name, "100");
        }

        if(isPlayer && !this.functionCalled)
        {
            this.consoleLogger.log(this.turnCount, Message.SyntaxError);
            this.nextTurn();
        }
            
    }

    nextTurn()
    {
        var previousAttacker = this.currentAttacker;
        previousAttacker.actedThisTurn = false;

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
        if(enemy != this.enemy)
        {
            this.consoleLogger.log(this.turnCount, Message.SyntaxError);
            return;
        }
        
        let currentHero = this.currentAttacker as Hero;

        if(currentHero.heroType == HeroType.Warrior)
        {
            this.meleeAttack(currentHero, this.currentTarget);
        }
        else{
            currentHero.PlayAttackAnimation();
        }

        this.consoleLogger.logAttack(this.turnCount, currentHero.name, enemy.name, "100");
        this.functionCalled = true;
    }
}