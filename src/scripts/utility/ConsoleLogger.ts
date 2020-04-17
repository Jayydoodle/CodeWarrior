import { TextContainer } from "./TextContainer";

export class ConsoleLogger{

    private textContainer: TextContainer

    constructor(){
        this.textContainer = new TextContainer("console");
    }

    log(turn: number, message: string)
    {
        this.textContainer.addText(turn + ": " + message + "<br></br>");
    }

    logAttack(turn: number, attacker: string, target: string, damage: string)
    {
        let message = attacker + " attacked " + target + " for " + damage + " damage";
        
        this.log(turn, message);
    }
}