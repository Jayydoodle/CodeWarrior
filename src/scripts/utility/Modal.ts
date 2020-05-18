import { Button } from "./Button";

export class Modal{

    private modal: HTMLDivElement;
    private modalBackground: HTMLDivElement;
    private buttons: Map<string, Button>;
    private visible = false;

    constructor(modalId: string, modalBackgroundId: string){

        this.buttons = new Map<string, Button>();
        this.modal = document.getElementById(modalId) as HTMLDivElement;
        this.modalBackground = document.getElementById(modalBackgroundId) as HTMLDivElement;
    }

    addbutton(buttonId: string, functionToRun, scope){

        let button = new Button(buttonId, functionToRun, scope);

        this.add(buttonId, button);
        
    }

    findButtonById(id: string)
    {
        let button: Button | undefined = this.buttons.get(id);

        if(button == undefined)
            throw "Button "+ "'" +id+ "'" +" Undefined";
        else
            return button;
    }

    toggleVisibility()
    {
        if(!this.visible){
            this.modalBackground.style.display = "inline-block";
        }
        else
            this.modalBackground.style.display = "none";

        this.visible = !this.visible;
    }

    private add(buttonId: string, button: Button)
    {
        this.buttons.set(buttonId, button);
    }
}