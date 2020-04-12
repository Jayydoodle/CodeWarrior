export class TextContainer
{
    private htmlElement: HTMLDivElement

    constructor(htmlElementId: string)
    {
        this.htmlElement = document.getElementById(htmlElementId) as HTMLDivElement;
    }

    updateText(text: string)
    {
        this.htmlElement.innerText = text;
    }
}