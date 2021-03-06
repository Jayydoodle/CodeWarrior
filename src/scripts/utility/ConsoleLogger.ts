import { TextContainer } from "./TextContainer";

export class ConsoleLogger{

    private textContainer: TextContainer

    constructor(){
        this.textContainer = new TextContainer("console");
    }

    clear()
    {
        this.textContainer.clear();
    }

    log(message: string)
    {
        this.textContainer.addText(message);
    }

    logTurn(turn: number, message: string)
    {
        this.textContainer.addText(turn + ": " + message);
    }

    logAttack(turn: number, attacker: string, target: string, damage: number)
    {
        let message = attacker + " attacked " + target + " for " + damage + " damage";
        
        this.logTurn(turn, message);
    }

    logDamage(target: string, damage: number)
    {
        let message = target + " took " + damage + " damage";

        this.log(message);
    }
}