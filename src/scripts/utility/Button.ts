export class Button 
{
    private htmlElement: HTMLButtonElement;

    constructor(htmlElementId: string, functionToRun, scope)
    {
        this.htmlElement = document.getElementById(htmlElementId) as HTMLButtonElement;
        this.onClick(functionToRun, scope);
    }
    onClick(functionToRun, scope)
    {
        this.htmlElement.onclick = functionToRun.bind(scope);
    }
}