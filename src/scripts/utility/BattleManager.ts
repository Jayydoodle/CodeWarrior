import { BattleParty, EnemyParty } from "../objects/characters/Party";
import { Character, Hero, Enemy } from "../objects/characters/Hero";
import { CharacterType, EventType, AttackDelay, HeroType, Message, ActionType } from "./Enumeration";
import { TypedPriorityQueue } from "../../../node_modules/typedpriorityqueue";
import { Queue } from "../../../node_modules/queue-typescript";
import { ConsoleLogger } from "./ConsoleLogger";
import { Hud } from "./Hud";
import { Spell } from "../objects/spells_and_abilities/Spell";
import { DamageCalculator } from "./DamageCalculator";

export class BattleManager{

    private scene: Phaser.Scene;
    private hud: Hud;
    private timer: Phaser.Time.TimerEvent;
    private consoleLogger: ConsoleLogger;
    private turnCount: number = 1;
    private code: string;
    private functionCalled: boolean = false;
    private errorLogged: boolean = false;
    private isPaused: boolean = false;

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

    constructor(scene: Phaser.Scene, hud: Hud, battleParty: BattleParty, enemyParty: EnemyParty)
    {
        this.scene = scene;
        this.hud = hud;
        this.battleParty = battleParty;
        this.enemyParty = enemyParty;

       /* this.queue = new TypedPriorityQueue<Character>
        (function(a: Character, b: Character){ return a.priority > b.priority });*/

        this.queue = new Queue();
        this.consoleLogger = new ConsoleLogger();

        this.battleParty.group.forEach(member => {
            this.queue.enqueue(member);
        });

        this.hud.updateAll(battleParty);

        this.enemyParty.group.forEach(member => {
            this.queue.enqueue(member);
        });

        this.enemyParty.emitter.on(EventType.AttackComplete, this.nextTurn, this);
        this.enemyParty.emitter.on(EventType.EffectApplied, this.logMessage, this);
        this.battleParty.emitter.on(EventType.AttackComplete, this.nextTurn, this);
        this.battleParty.emitter.on(EventType.EffectApplied, this.logMessage, this);
    }

    logMessage(message: string)
    {
        this.consoleLogger.log(message);
    }

    pause()
    {
        this.isPaused = !this.isPaused;
    }

    update()
    {
        if(this.currentAttacker != null && this.isMeleeAttacker()){
            this.currentAttacker.body.velocity.setTo(0, 0);
            this.currentAttacker.PlayAttackAnimation();
        }
        
        this.hud.updateAll(this.battleParty);
    }

    startBattle(code: string)
    {
        this.code = code;

        var searchForWhile = /while/gi;

        if(code.search(searchForWhile) != -1)
        {
            this.consoleLogger.log(Message.WhileNotAllowedError);
            return;
        }
        
        if(this.currentAttacker == null){
            this.currentAttacker = this.queue.dequeue() as Character;
            this.firstAttacker = this.currentAttacker;
            this.currentTarget = this.enemyParty.group[0]; // default target
        }
        else
        {
            if(this.isPaused)
                this.pause();
            else
                return;
        }

        this.handleTurn();
    }

    handleTurn()
    {
        this.functionCalled = false;
        this.errorLogged = false;

        if(this.isPaused)
            return;

        var isPlayer = this.currentAttacker.characterType == CharacterType.player;
        
        if(isPlayer){

            var player = this.currentAttacker as Hero;

            /* player variables */
            let warriorTurn = player.heroType == HeroType.Melee;
            let mageTurn = player.heroType == HeroType.Magic;
            let rangerTurn = player.heroType == HeroType.Ranged;
            let turn = this.turnCount;

            try {
                eval(this.code); 
            } catch (e) { // required for all custom battle builds
                
              this.consoleLogger.logTurn(this.turnCount, Message.SyntaxError);
            }
        }
        else{
            this.currentTarget = this.determineTarget(this.battleParty.group);

            //this.cast("fire", this.currentTarget.name);
            this.meleeAttack(this.currentAttacker, this.currentTarget);


            let damage = DamageCalculator.CalculateDamage(this.currentAttacker, this.currentTarget);

            // required for all custom battle builds
            this.consoleLogger.logAttack(this.turnCount, this.currentAttacker.name, this.currentTarget.name, damage);
        }

        // required for all custom battle builds
        if(isPlayer && !this.functionCalled)
        {
            if(!this.errorLogged)
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
        let damage = attacker.getBaseAttack() - target.getBaseDefense();
        target.takeDamage(damage);

        return damage;
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

    meleeAttack(attacker: Character, target: Character)
    {
        attacker.configureAttack();
        this.scene.physics.moveToObject(attacker, target, this.movementSpeed);
    }

    checkTarget(name: String)
    {

        let target: Character | undefined;

        this.battleParty.group.forEach( member => {
            if(member.name === name) target = member;
        });
            
        this.enemyParty.group.forEach( member => {
            if(member.name === name) target = member;
        });
        
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
        
        let target = this.checkTarget(enemyName);

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

        if(currentHero.heroType == HeroType.Melee)
        {
            this.meleeAttack(currentHero, this.currentTarget);
        }
        else{
            currentHero.PlayAttackAnimation();
        }

        

        let damage = DamageCalculator.CalculateDamage(currentHero, this.currentTarget);

        this.consoleLogger.logAttack(this.turnCount, currentHero.name, this.currentTarget.name, damage);

        this.functionCalled = true;
    }

    cast(spellName: string, targetName: string)
    {
        if(this.functionCalled)
        {
            return;
        }

        let target = this.checkTarget(targetName);

        if(!target)
        {
            return;
        }

        if(!target.isAlive)
        {
            return;
        }
        
        this.currentTarget = target;
        let spell:Spell;

        try {
            spell = this.currentAttacker.cast(spellName, target);
        } catch (error) {

            this.consoleLogger.logTurn(this.turnCount, error);
            this.errorLogged = true;
            return;
        }

        if(spell.actionType == ActionType.Offense)
        {
            let damage = DamageCalculator.CalculateDamage(this.currentAttacker, this.currentTarget, spell);
            this.consoleLogger.logAttack(this.turnCount, this.currentAttacker.name, this.currentTarget.name, damage);
        }

        this.functionCalled = true;
    }
}