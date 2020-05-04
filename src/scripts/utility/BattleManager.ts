import { BattleParty, EnemyParty } from "../objects/characters/Party";
import { Character, Hero, Enemy } from "../objects/characters/Hero";
import { CharacterType, EventType, AttackDelay, HeroType, Message, ActionType, Depth, AttackType } from "./Enumeration";
import { TypedPriorityQueue } from "../../../node_modules/typedpriorityqueue";
import { Queue } from "../../../node_modules/queue-typescript";
import { ConsoleLogger } from "./ConsoleLogger";
import { Hud } from "./Hud";
import { DamageCalculator } from "./DamageCalculator";
import { LimitBurstDatabase } from "../objects/spells_and_abilities/LimitBurstDatabase";

export class BattleManager{

    private scene: Phaser.Scene;
    private hud: Hud;
    private lbBackground: Phaser.GameObjects.Rectangle;
    private gameWidth: number;
    private gameHeight: number;

    private consoleLogger: ConsoleLogger;
    public emitter: Phaser.Events.EventEmitter;
    private turnCount: number = 1;
    private code: string;
    private functionCalled: boolean = false;
    private errorLogged: boolean = false;
    private isPaused: boolean = false;
    private isContinuous: boolean = true;

    private meleeAttackOffset: number = 300;
    private limitBurstOffset: number = 100;
    private movementSpeed: number = 3000;
    private attackDelay: number = AttackDelay.none;

    private battleParty: BattleParty;
    private enemyParty: EnemyParty;
    private currentTarget: Character;
    private currentAttacker: Character;

    private queue: Queue<Character>;
    private seenCharacters: Map<string, Character>;
    private battleSize: number = 0;

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

    constructor(scene: Phaser.Scene, consoleLogger: ConsoleLogger, hud: Hud, battleParty: BattleParty, enemyParty: EnemyParty)
    {
        this.scene = scene;
        this.hud = hud;
        this.battleParty = battleParty;
        this.enemyParty = enemyParty;

        this.gameWidth = this.scene.game.config.width as number;
        this.gameHeight = this.scene.game.config.height as number;

        this.limitBurstDatabase = new LimitBurstDatabase();
        this.emitter = new Phaser.Events.EventEmitter();
        this.seenCharacters = new Map<string, Character>();

        this.lbBackground = new Phaser.GameObjects.Rectangle(this.scene, this.gameWidth/2, this.gameHeight/2, this.gameWidth, this.gameHeight, 0x000000);
        this.lbBackground.setDepth(Depth.Effect);
        this.lbBackground.setVisible(false);
        this.scene.add.existing(this.lbBackground);

       /* this.queue = new TypedPriorityQueue<Character>
        (function(a: Character, b: Character){ return a.priority > b.priority });*/

        this.queue = new Queue();
        this.consoleLogger = consoleLogger;

        this.battleParty.group.forEach(member => {
            this.queue.enqueue(member);
            member.tp = 100;
            this.battleSize++;
        });

        this.hud.updateAll(battleParty);

        this.enemyParty.group.forEach(member => {
            this.queue.enqueue(member);
            this.battleSize++;
        });

        this.enemyParty.emitter.on(EventType.AttackComplete, this.completeTurn, this);
        this.enemyParty.emitter.on(EventType.EffectApplied, this.logMessage, this);
        this.enemyParty.emitter.on(EventType.CharacterDefeated, this.logMessage, this);
        this.enemyParty.emitter.on(EventType.Revived, this.revive, this);
        this.enemyParty.emitter.on(EventType.PartyDefeated, this.endBattle, this);
        this.battleParty.emitter.on(EventType.AttackComplete, this.completeTurn, this);
        this.battleParty.emitter.on(EventType.EffectApplied, this.logMessage, this);
        this.battleParty.emitter.on(EventType.EffectsUpdated, this.updateEffects, this);
        this.battleParty.emitter.on(EventType.CharacterDefeated, this.logMessage, this);
        this.battleParty.emitter.on(EventType.Revived, this.revive, this);
        this.battleParty.emitter.on(EventType.PartyDefeated, this.endBattle, this);
    }

//#region : Utility

    getTurnCount(){

        return this.turnCount;
    }

    pause()
    {
        this.isPaused = !this.isPaused;
    }

//#endregion

//#region : Emitter Handlers

    logMessage(message: string)
    {
        this.consoleLogger.log(message);
    }

    updateEffects(character: Character)
    {
        this.hud.updateStatusAnimation(character);
    }

    revive(character: Character)
    {
        this.queue.enqueue(character);
        this.battleSize++;
    }

//#endregion

//#region : Battle Lifecycle

    update()
    {
        if(this.currentAttacker != null && this.isMeleeAttacker()){
            this.currentAttacker.body.velocity.setTo(0, 0);
            this.currentAttacker.playAttackAnimation(this.currentTarget);
        }
        else if(this.currentAttacker != null && this.isLimitBursting()){
            this.currentAttacker.body.velocity.setTo(0,0);
            this.lbBackground.setVisible(true);
            
            if(this.currentAttacker.characterType == CharacterType.player)
                this.currentAttacker.limitBurst(this.enemyParty, this.battleParty);
            else
                this.currentAttacker.limitBurst(this.battleParty, this.enemyParty);
        }

        this.hud.updateAll(this.battleParty);
    }

    endBattle()
    {
        this.battleParty.emitter.removeAllListeners();
        this.battleParty.emitter.destroy();
        this.enemyParty.emitter.removeAllListeners();
        this.enemyParty.emitter.destroy();
        this.emitter.emit(EventType.BattleEnded, !this.battleParty.hasBeenDefeated());
        this.emitter.destroy();
    }

    startBattle(code: string)
    {
        this.code = code;

        var searchForWhile = /while/gi;
        var searchForFor = /for/gi;

        if(code.search(searchForWhile) != -1)
        {
            this.consoleLogger.log(Message.WhileNotAllowedError);
            return;
        }

        if(code.search(searchForFor) != -1)
        {
            this.consoleLogger.log(Message.ForNotAllowedError);
            return;
        }

        if(this.scene.scene.isPaused())
            this.scene.scene.resume();
        
        if(this.currentAttacker == null){
            this.currentAttacker = this.queue.dequeue() as Character;
            this.currentTarget = this.enemyParty.group[0]; // default target
        }
        else
        {
            if(this.isPaused)
                this.pause();
            else if(this.isContinuous)
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

        if(this.currentAttacker.isAsleep) // refactor
        {
            this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " is asleep");
            this.nextTurn();
            return;
        }

        if(this.currentAttacker.isConfused) // refactor
        {
            this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " is confused!");
            
            if(this.currentAttacker.characterType == CharacterType.player)
                this.currentTarget = this.determineTarget(this.battleParty.group);
            else
                this.currentTarget = this.determineTarget(this.enemyParty.group);

            this.attack(this.currentTarget.name);
            return;
        }

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
            this.limitBurstReady = player.limitBurstReady();
            this.turn = this.turnCount;

            try {
                eval(this.code); 
            } catch (error) { // required for all custom battle builds
                
              this.consoleLogger.logTurn(this.turnCount, error);
              this.errorLogged = true;

              if(error != Message.MultipleActionError){ this.nextTurn(); }
            }
        }
        else{

            // Create a function here that can be implemented differently
            // in different battles to invoke different enemy behavior

            var enemy1Turn = this.currentAttacker == this.enemyParty.group[0];
            var enemy2Turn = this.currentAttacker == this.enemyParty.group[1];
            var enemy3Turn = this.currentAttacker == this.enemyParty.group[2];

            this.currentTarget = this.determineTarget(this.battleParty.group);

            if(this.turnCount == 1 || this.turnCount % 4 == 0){
                if(enemy1Turn)this.cast("sleep", "", true);
                else if(enemy2Turn)this.cast("poison", "", true);
                else if(enemy3Turn)this.cast("confuse", "", true);
            }
            else
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

        this.currentAttacker.actedThisTurn = false;
        this.currentAttacker.resetPosition();

        this.nextTurn();
    }

    nextTurn()
    {
        
        var previousAttacker = this.currentAttacker;
        previousAttacker.handleStatusEffects();

        if(this.enemyParty.hasBeenDefeated() || this.battleParty.hasBeenDefeated()){ return; } 
        
        if(!this.seenCharacters.has(previousAttacker.name))
            this.seenCharacters.set(previousAttacker.name, previousAttacker);

        this.currentAttacker = this.queue.dequeue() as Character;
        this.queue.enqueue(previousAttacker);

        while(!this.currentAttacker.isAlive) // remove dead characters from queue
        {
            this.currentAttacker = this.queue.dequeue() as Character;
            this.battleSize--;
        }
        
        if(this.seenCharacters.size >= this.battleSize)
        {
            this.turnCount++;
            this.consoleLogger.log("<br>Turn: " + this.turnCount);
            this.seenCharacters.clear();

            if(!this.isContinuous)
                return;
        }

        this.scene.time.delayedCall(this.attackDelay, this.handleTurn, [], this);
    }

//#endregion

//#region : Movement Helpers

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

//#endregion

//#region : Attack Targeting

    determineTarget(targetParty: Character[])
    {
        let target: Character

        var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        target = targetParty[random];

        while(!target.isAlive) // if you change this to prevent self targeting you must handle the confuse spell or game will freeze
        {
            var random = Math.floor(Math.random() * (2 - 0 + 1) + 0);
            target = targetParty[random];
        }

        return target;
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
        else if(name === "random ally")
            target = this.determineTarget(this.battleParty.group);

        return target;
    }

    validateTarget(targetName: string, allowDead = false)
    {
        let target = this.checkTarget(targetName);
       
        if(!target || (!target.isAlive && !allowDead)) 
            throw this.currentAttacker.name + " cannot perform this action, " + 
            "'" + targetName + "'" + " is not a valid target";
        else
            return target;
    }

//#endregion

//#region : Battle Commands

    attack(enemyName: string, isEnemy?: boolean)
    {
        if(this.functionCalled) { throw Message.MultipleActionError; }
        
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
            this.currentAttacker.playAttackAnimation(this.currentTarget);
        }
    }

    cast(spellName: string, targetName: string, isEnemy?: boolean)
    {
        if(this.functionCalled) { throw Message.MultipleActionError; }
        
        this.functionCalled = true;
        
        if(!isEnemy)
        {   
            try {
                let target;

                if(spellName === "raise")
                    target = this.validateTarget(targetName, true);
                else
                    target = this.validateTarget(targetName);
                
                this.currentTarget = target;
            } 
            catch (error) { 
                throw(error + " for " + "'" + spellName + "'"); 
            }
        }

        try {    
            this.currentAttacker.cast(spellName, this.currentTarget);
            this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " cast " + spellName);
        } 
        catch (error) {
            throw error;
        }
    }

    limitBurst(name: string)
    {
        if(this.functionCalled) { throw Message.MultipleActionError; }
        
        this.functionCalled = true;

        try {
            this.currentAttacker.learn(this.limitBurstDatabase.findByName(name));
        } 
        catch (error) {
            throw(error);
        }

        this.currentAttacker.configureLimitBurst();
        this.scene.physics.moveTo(this.currentAttacker, this.gameWidth / 2, this. gameHeight / 2, this.movementSpeed);
        this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " used " + name);
    }

//#endregion

}