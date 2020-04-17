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

    addText(text:string)
    {
        var innerDiv = document.createElement('div') as HTMLDivElement;
        this.htmlElement.appendChild(innerDiv);
        innerDiv.innerHTML = text;
        this.htmlElement.scrollTop += this.htmlElement.lastElementChild?.scrollHeight as number;
    }
}