import { Character } from "../objects/characters/Hero";
import { CharacterType } from "./Enumeration";
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
        this.textContainer.addText(message, null);
    }

    logTurn(turn: number, message: string)
    {
        this.textContainer.addText(turn + ": " + message, null);
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

    logDialog(character: Character, target: Character, message: string)
    {
        let color: string;
        let oppositeColor: string;

        if(character.characterType == CharacterType.enemy){
            color = 'orange';
            oppositeColor = 'springgreen';
        }
        else {
            color = 'springgreen';
            oppositeColor = 'orange';
        }

        if(target != null && message.includes(target.name))
            message = message.replaceAll(target.name, "<label style='color: " + oppositeColor + "'>" + target.name + "</label>");

        var innerDiv = document.createElement('div') as HTMLDivElement;
        innerDiv.style.fontSize = 'medium';
        innerDiv.style.fontWeight = 'bold';
        innerDiv.innerHTML = "<label style='color: " + color + "'>" + character.name + "</label>: " + message;
        this.textContainer.addHTML(innerDiv);
    }
}