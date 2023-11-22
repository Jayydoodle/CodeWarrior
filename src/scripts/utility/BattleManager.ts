import { BattleParty, EnemyParty } from "../objects/characters/Party";
import { Character, Hero, Enemy } from "../objects/characters/Hero";
import { CharacterType, EventType, AttackDelay, HeroType, Message, ActionType, Depth, AttackType, GameMode } from "./Enumeration";
import { TypedPriorityQueue } from "../../../node_modules/typedpriorityqueue";
import { Queue } from "../../../node_modules/queue-typescript";
import { ConsoleLogger } from "./ConsoleLogger";
import { Hud } from "./Hud";
import { DamageCalculator } from "./DamageCalculator";
import { LimitBurstDatabase } from "../objects/spells_and_abilities/LimitBurstDatabase";
import { EnemyHud } from "./EnemyHud";

export class BattleManager{

    protected scene: Phaser.Scene;
    protected hud: Hud;
    protected enemyHud: EnemyHud;
    protected lbBackground: Phaser.GameObjects.Rectangle;
    protected gameWidth: number;
    protected gameHeight: number;

    protected consoleLogger: ConsoleLogger;
    public emitter: Phaser.Events.EventEmitter;
    protected turnCount: number = 1;
    protected code: string;
    protected functionCalled: boolean = false;
    protected errorLogged: boolean = false;
    protected isPaused: boolean = false;
    protected isContinuous: boolean;

    protected meleeAttackOffset: number = 300;
    protected limitBurstOffset: number = 100;
    protected movementSpeed: number = 3000;
    protected attackDelay: number = AttackDelay.none;

    protected battleParty: BattleParty;
    protected enemyParty: EnemyParty;
    protected currentTarget: Character;
    protected currentAttacker: Character;

    protected queue: Queue<Character>;
    protected seenCharacters: Map<string, Character>;
    protected battleSize: number = 0;

    // player variables
    protected limitBurstReady: boolean;
    protected warriorHp: number;
    protected warriorTurn: boolean;
    protected warriorIsAlive: boolean;
    protected mageHp: number;
    protected mageTurn: boolean;
    protected mageIsAlive:boolean;
    protected rangerHp: number;
    protected rangerTurn: boolean;
    protected rangerIsAlive: boolean;
    protected hp: number;
    protected mp: number;
    protected turn: number;

    protected limitBurstDatabase: LimitBurstDatabase;

    constructor(scene: Phaser.Scene, consoleLogger: ConsoleLogger, hud: Hud, enemyHud: EnemyHud, battleParty: BattleParty, enemyParty: EnemyParty, gameMode: GameMode)
    {
        this.scene = scene;
        this.hud = hud;
        this.enemyHud = enemyHud;
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
            this.battleSize++;
        });

        this.hud.updateAll(battleParty);
        this.enemyHud.update(this.enemyParty.group[0]);

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

        this.setBehavior(gameMode);
    }

//#region : Utility

    setBehavior(gameMode: GameMode){

        if(gameMode == GameMode.Easy)
        {
            this.isContinuous = false;
        }
        else if(gameMode == GameMode.Hard)
        {
            this.isContinuous = true;
        }
    }

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
            this.currentAttacker?.body?.velocity.setTo(0, 0);
            this.currentAttacker.playAttackAnimation(this.currentTarget);
        }
        else if(this.currentAttacker != null && this.isLimitBursting()){
            this.currentAttacker?.body?.velocity.setTo(0,0);
            this.lbBackground.setVisible(true);
            
            if(this.currentAttacker.characterType == CharacterType.player)
                this.currentAttacker.limitBurst(this.enemyParty, this.battleParty);
            else
                this.currentAttacker.limitBurst(this.battleParty, this.enemyParty);
        }

        if(this.currentAttacker && this.currentAttacker.characterType == CharacterType.enemy)
            this.enemyHud.update(this.currentAttacker);

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
            this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " is asleep and his turn was skipped!");
            this.nextTurn();
            return;
        }

        if(this.currentAttacker.isConfused) // refactor
        {
            this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " is confused and starts attacking party members!");
            
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
            this.warriorTurn = this.currentAttacker.heroType == HeroType.Melee;
            this.warriorHp = this.battleParty.warrior.getCurrentHp();
            this.warriorIsAlive = this.battleParty.warrior.isAlive;
            this.mageTurn = this.currentAttacker.heroType == HeroType.Magic;
            this.mageHp = this.battleParty.mage.getCurrentHp();
            this.mageIsAlive = this.battleParty.mage.isAlive;
            this.rangerTurn = this.currentAttacker.heroType == HeroType.Ranged;
            this.rangerHp = this.battleParty.ranger.getCurrentHp();
            this.rangerIsAlive = this.battleParty.ranger.isAlive;

            this.hp = this.currentAttacker.getCurrentHp();
            this.mp = this.currentAttacker.getCurrentMp();
            this.limitBurstReady = this.currentAttacker.limitBurstReady();
            this.turn = this.turnCount;

            try {
                eval(this.code); 
            } catch (error) { // required for all custom battle builds
                
              this.consoleLogger.logTurn(this.turnCount, error);
              this.errorLogged = true;

              if(error != Message.MultipleActionError){ this.nextTurn(); }
            }
        }
        else{ this.handleEnemyTurn(); }

        if(isPlayer && !this.functionCalled && !this.errorLogged ) // required for all custom battle builds
        {
           this.consoleLogger.logTurn(this.turnCount, Message.SyntaxError);
           this.nextTurn();
        }
            
    }

    // This method is overridden in each battle manager that extends BattleManager
    handleEnemyTurn()
    {
        var enemy1Turn = this.currentAttacker == this.enemyParty.group[0];
        var enemy2Turn = this.currentAttacker == this.enemyParty.group[1];
        var enemy3Turn = this.currentAttacker == this.enemyParty.group[2];

        this.currentTarget = this.determineTarget(this.battleParty.group);

        if(this.turnCount == 1 || this.turnCount % 6 == 0){
            if(enemy1Turn)this.cast("sleep", "", true);
            else if(enemy2Turn)this.cast("poison", "", true);
            else if(enemy3Turn)this.cast("confuse", "",true);
        }
        else
            this.attack("", true);
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

        if(this.currentTarget.characterType == CharacterType.enemy)
            this.enemyHud.update(this.currentTarget);

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

        if(enemyName == null)
            enemyName = "random";
        
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
            if(spellName == "death")
            {
                this.consoleLogger.logTurn(this.turnCount, "player cannot use the spell 'death', stop trying to cheat");
                return;
            }
            
            try 
            {
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
            this.currentAttacker.configureLimitBurst();
        } 
        catch (error) {
            throw(error);
        }

        this.scene.physics.moveTo(this.currentAttacker, this.gameWidth / 2, this. gameHeight / 2, this.movementSpeed);
        this.consoleLogger.logTurn(this.turnCount, this.currentAttacker.name + " used " + name);
    }

//#endregion

}