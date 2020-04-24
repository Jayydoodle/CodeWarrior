import { BattleParty, EnemyParty } from "../objects/characters/Party";
import { Character, Hero, Enemy } from "../objects/characters/Hero";
import { CharacterType, EventType, AttackDelay, HeroType, Message, ActionType, Depth, AttackType } from "./Enumeration";
import { TypedPriorityQueue } from "../../../node_modules/typedpriorityqueue";
import { Queue } from "../../../node_modules/queue-typescript";
import { ConsoleLogger } from "./ConsoleLogger";
import { Hud } from "./Hud";
import { Spell } from "../objects/spells_and_abilities/Spell";
import { DamageCalculator } from "./DamageCalculator";
import { LimitBurstDatabase } from "../objects/spells_and_abilities/LimitBurstDatabase";
import { Background } from "../objects/world_space/background";

export class BattleManager{

    private scene: Phaser.Scene;
    private hud: Hud;
    private lbBackground: Phaser.GameObjects.Rectangle;
    private gameWidth: number;
    private gameHeight: number;

    private timer: Phaser.Time.TimerEvent;
    private consoleLogger: ConsoleLogger;
    private turnCount: number = 1;
    private code: string;
    private functionCalled: boolean = false;
    private errorLogged: boolean = false;
    private isPaused: boolean = false;
    private battleStarted: boolean = false;

    private meleeAttackOffset: number = 300;
    private limitBurstOffset: number = 100;
    private movementSpeed: number = 3000;
    private attackDelay: number = AttackDelay.none;

    private battleParty: BattleParty;
    private enemyParty: EnemyParty;
    private firstAttacker: Character;
    private currentTarget: Character;
    private currentAttacker: Character;

    private queue: Queue<Character>;

    // player variables
    private limitBurstReady: boolean;
    private warriorHp: number;
    private warriorTurn: boolean;
    private warriorIsAlive: boolean;
    private mageHp: number;
    private mageTurn: boolean;
    private mageIsAlive:boolean;
    private rangerHp: number;
    private rangerTurn: boolean;
    private rangerIsAlive: boolean;
    private hp: number;
    private mp: number;
    private turn: number;

    private limitBurstDatabase: LimitBurstDatabase;

    constructor(scene: Phaser.Scene, hud: Hud, battleParty: BattleParty, enemyParty: EnemyParty)
    {
        this.scene = scene;
        this.hud = hud;
        this.battleParty = battleParty;
        this.enemyParty = enemyParty;

        this.gameWidth = this.scene.game.config.width as number;
        this.gameHeight = this.scene.game.config.height as number;

        this.limitBurstDatabase = new LimitBurstDatabase();

        this.lbBackground = new Phaser.GameObjects.Rectangle(this.scene, this.gameWidth/2, this.gameHeight/2, this.gameWidth, this.gameHeight, 0x000000);
        this.lbBackground.setDepth(Depth.Effect);
        this.lbBackground.setVisible(false);
        this.scene.add.existing(this.lbBackground);

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

        this.enemyParty.emitter.on(EventType.AttackComplete, this.completeTurn, this);
        this.enemyParty.emitter.on(EventType.EffectApplied, this.logMessage, this);
        this.enemyParty.emitter.on(EventType.CharacterDefeated, this.logMessage, this);
        this.battleParty.emitter.on(EventType.AttackComplete, this.completeTurn, this);
        this.battleParty.emitter.on(EventType.EffectApplied, this.logMessage, this);
        this.battleParty.emitter.on(EventType.CharacterDefeated, this.logMessage, this);
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
        else if(this.currentAttacker != null && this.isLimitBursting()){
            this.currentAttacker.body.velocity.setTo(0,0);
            this.lbBackground.setVisible(true);
            this.currentAttacker.limitBurst(this.enemyParty, this.battleParty);
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
            this.warriorTurn = player.heroType == HeroType.Melee;
            this.warriorHp = this.battleParty.warrior.getCurrentHp();
            this.warriorIsAlive = this.battleParty.warrior.isAlive;
            this.mageTurn = player.heroType == HeroType.Magic;
            this.mageHp = this.battleParty.mage.getCurrentHp();
            this.mageIsAlive = this.battleParty.mage.isAlive;
            this.rangerTurn = player.heroType == HeroType.Ranged;
            this.rangerHp = this.battleParty.ranger.getCurrentHp();
            this.rangerIsAlive = this.battleParty.ranger.isAlive;

            this.hp = player.getCurrentHp();
            this.mp = player.getCurrentMp();
            this.limitBurstReady = player.limitBurstReady;
            this.turn = this.turnCount;

            try {
                eval(this.code); 
            } catch (error) { // required for all custom battle builds
                
              this.consoleLogger.logTurn(this.turnCount, error);
              this.errorLogged = true;
              this.nextTurn();
            }
        }
        else{
            this.currentTarget = this.determineTarget(this.battleParty.group);

            this.attack("", true);
        }

        if(isPlayer && !this.functionCalled && !this.errorLogged ) // required for all custom battle builds
        {
           this.consoleLogger.logTurn(this.turnCount, Message.SyntaxError);
           this.nextTurn();
        }
            
    }

    completeTurn()
    {
        let attackType = this.currentAttacker.currentAttackType;

        if(attackType == AttackType.Regular)
        {
            let damage = DamageCalculator.CalculateDamage(this.currentAttacker, this.currentTarget);
            this.consoleLogger.logAttack(this.turnCount, this.currentAttacker.name, this.currentTarget.name, damage);
            this.currentAttacker.addTP(damage);
        }
        else if(attackType == AttackType.Cast)
        {
            let activeSpell = this.currentAttacker.activeSpell;

            if(activeSpell.actionType == ActionType.Offense)
            {
                let damage = DamageCalculator.CalculateDamage(this.currentAttacker, this.currentTarget, activeSpell);
                this.consoleLogger.logDamage(this.currentTarget.name, damage);
                this.currentAttacker.addTP(damage);
            }
        }
        this.lbBackground.setVisible(false);
        this.nextTurn();
    }

    nextTurn()
    {
        if(!this.currentTarget.isAlive)
        {
            this.currentTarget.playDeathAnimation();
        }

        if(this.enemyParty.hasBeenDefeated() || this.battleParty.hasBeenDefeated()) return;
        
        var previousAttacker = this.currentAttacker;
        previousAttacker.actedThisTurn = false;
        previousAttacker.resetPosition();

        this.currentAttacker = this.queue.dequeue() as Character;
        this.queue.enqueue(previousAttacker);

        while(!this.currentAttacker.isAlive) // remove dead characters from queue
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

    isMeleeAttacker()
    {
        switch(this.currentAttacker.characterType)
        {
            case CharacterType.player:
                return (this.currentAttacker.x <= this.currentTarget.x + this.meleeAttackOffset) 
                && this.currentAttacker.isAttacking && !this.currentAttacker.actedThisTurn
                ? true : false;
            
            case CharacterType.enemy:
                return (this.currentAttacker.x >= this.currentTarget.x - this.meleeAttackOffset) 
                && this.currentAttacker.isAttacking && !this.currentAttacker.actedThisTurn
                ? true : false;
        }
    }

    isLimitBursting()
    {
        switch(this.currentAttacker.characterType)
        {
            case CharacterType.player:
                return (this.currentAttacker.x <= this.gameWidth / 2 + this.limitBurstOffset) 
                && this.currentAttacker.isLimitBursting && !this.currentAttacker.actedThisTurn
                ? true : false;
            
            case CharacterType.enemy:
                return (this.currentAttacker.x >= this.gameWidth / 2 - this.limitBurstOffset) 
                && this.currentAttacker.isLimitBursting && !this.currentAttacker.actedThisTurn
                ? true : false;
        }
    }

    meleeAttack(attacker: Character, target: Character)
    {
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

    validateTarget(enemyName: string)
    {
        let target = this.checkTarget(enemyName);
       
        if(!target || !target.isAlive) 
            throw enemyName + " is not a valid target";
        else
            return target;
    }

    attack(enemyName: string, isEnemy?: boolean)
    {
        this.functionCalled = true;
        
        if(!isEnemy)
        {
            try {
                let target = this.validateTarget(enemyName);
                this.currentTarget = target;
            } catch (error) {

                throw error;
            }
        }

        this.currentAttacker.configureAttack();

        if(this.currentAttacker.heroType == HeroType.Melee){
            this.meleeAttack(this.currentAttacker, this.currentTarget);
        } 
        else{
            this.currentAttacker.PlayAttackAnimation();
        }
    }

    cast(spellName: string, targetName: string, isEnemy?: boolean)
    {
        this.functionCalled = true;
        
        if(!isEnemy)
        {   
            try {
                let target = this.validateTarget(targetName);
                this.currentTarget = target;
            } 
            catch (error) { 
                throw(error); 
            }
        }

        try {    
            this.currentAttacker.configureCast();
            this.currentAttacker.cast(spellName, this.currentTarget);
            this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " cast " + spellName);
        } 
        catch (error) {
            throw error;
        }
    }

    limitBurst(name: string)
    {
        try {
            this.currentAttacker.learn(this.limitBurstDatabase.findByName(name));
        } 
        catch (error) {
            throw(error);
        }

        this.currentAttacker.configureLimitBurst();
        this.scene.physics.moveTo(this.currentAttacker, this.gameWidth / 2, this. gameHeight / 2, this.movementSpeed);
        this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " used " + name);

        this.functionCalled = true;
    }
}