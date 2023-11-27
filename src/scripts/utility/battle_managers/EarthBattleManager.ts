import { BattleManager } from "../BattleManager";
import { Character } from "../../objects/characters/Hero";
import { LimitBurstDatabase } from "../../objects/spells_and_abilities/LimitBurstDatabase";
import { ConsoleLogger } from "../ConsoleLogger";
import { Hud } from "../Hud";
import { EnemyParty, BattleParty } from "../../objects/characters/Party";
import { EnemyHud } from "../EnemyHud";
import { GameMode } from "../Enumeration";

export class EarthBattleManager extends BattleManager{

    constructor(scene: Phaser.Scene, consoleLogger: ConsoleLogger, hud: Hud, enemyHud: EnemyHud, battleParty: BattleParty, enemyParty: EnemyParty, gameMode: GameMode)
    {
        super(scene, consoleLogger, hud, enemyHud, battleParty, enemyParty, gameMode);
    }

//#region : Utility

    getTurnCount()
    { 
        return super.getTurnCount(); 
    }

    pause()
    { 
        super.pause(); 
    }

//#endregion

//#region : Emitter Handlers

    logMessage(message: string)
    {
        super.logMessage(message);
    }

    updateEffects(character: Character)
    {
        super.updateEffects(character);
    }

    revive(character: Character)
    {
        super.revive(character);
    }

//#endregion

//#region : Battle Lifecycle

    update()
    {
        super.update();
    }

    endBattle()
    {
        super.endBattle();
    }

    startBattle(code: string)
    {
        super.startBattle(code);
    }

    handleTurn()
    {
        super.handleTurn();
    }

    // This method is overridden in each battle manager that extends BattleManager
    handleEnemyTurn()
    {
        var enemyRangerTurn = this.currentAttacker == this.enemyParty.group[0];
        var enemyMageTurn = this.currentAttacker == this.enemyParty.group[1];
        var enemyWarriorTurn = this.currentAttacker == this.enemyParty.group[2];

        this.warriorIsAlive = this.battleParty.warrior.isAlive;
        this.mageIsAlive = this.battleParty.mage.isAlive;
        this.rangerIsAlive = this.battleParty.ranger.isAlive;

        this.currentTarget = this.determineTarget(this.battleParty.group);

        if(enemyMageTurn && this.turnCount % 10 == 0 && this.rangerIsAlive)
        {
            this.currentTarget =  this.battleParty.ranger;
            this.cast("death", "", true);

            this.consoleLogger.logDialog(this.currentAttacker, this.currentTarget, 'Every 10 turns I will kill ' + this.currentTarget.name + '!');
        }
        else if(enemyMageTurn && (this.turnCount == 1 || this.turnCount % 5 == 0) && this.warriorIsAlive)
        {
            this.currentTarget =  this.battleParty.warrior;
            this.cast("sleep", "", true);
            
            this.consoleLogger.logDialog(this.currentAttacker, this.currentTarget, 'Every 5 turns I will put ' + this.currentTarget.name + ' to sleep!');
        }
        else if(enemyRangerTurn && (this.turnCount == 1 || this.turnCount % 5 == 0) && this.warriorIsAlive)
        {
            this.currentTarget =  this.battleParty.warrior;
            this.cast("poison", "", true);

            this.consoleLogger.logDialog(this.currentAttacker, this.currentTarget, 'Every 5 turns I will poison ' + this.currentTarget.name + '!');
        }
        else
        {
            this.attack("", true);
        }
    }

    completeTurn()
    {
        super.completeTurn();
    }

    nextTurn()
    {
        super.nextTurn();
    }

//#endregion

//#region : Movement Helpers

    isMeleeAttacker()
    {
        return super.isMeleeAttacker();
    }

    isLimitBursting()
    {
        return super.isLimitBursting();
    }

    meleeAttack(attacker: Character, target: Character)
    {
        super.meleeAttack(attacker, target);
    }

//#endregion

//#region : Attack Targeting

    determineTarget(targetParty: Character[])
    {
        return super.determineTarget(targetParty);
    }

    checkTarget(name: String)
    {
        return super.checkTarget(name);
    }

    validateTarget(targetName: string, allowDead = false)
    {
        return super.validateTarget(targetName, allowDead);
    }

//#endregion

//#region : Battle Commands

    attack(enemyName: string, isEnemy?: boolean)
    {
        super.attack(enemyName, isEnemy);
    }

    cast(spellName: string, targetName: string, isEnemy?: boolean)
    {
        super.cast(spellName, targetName, isEnemy);
    }

    limitBurst(name: string)
    {
        super.limitBurst(name);
    }

//#endregion

}