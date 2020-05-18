export class Button 
{
    private button: HTMLButtonElement;

    constructor(buttonId: string, functionToRun, scope)
    {
        this.button = document.getElementById(buttonId) as HTMLButtonElement;
        this.onClick(functionToRun, scope);
    }
    onClick(functionToRun, scope)
    {
        this.button.onclick = functionToRun.bind(scope);
    }
}