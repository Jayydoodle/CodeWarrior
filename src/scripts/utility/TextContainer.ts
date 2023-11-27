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
        this.htmlElement.style.cssText = "font-family: FontleroyBrownNF; ";
    }

    addText(text:string, color: string|null)
    {
        var innerDiv = document.createElement('div') as HTMLDivElement;

        if(color != null)
            innerDiv.style.color = color;

        this.htmlElement.appendChild(innerDiv);
        innerDiv.innerHTML = text;
        this.htmlElement.scrollTop += this.htmlElement.lastElementChild?.scrollHeight as number;
    }

    addHTML(innerDiv: HTMLDivElement)
    {
        this.htmlElement.appendChild(innerDiv);
        this.htmlElement.scrollTop += this.htmlElement.lastElementChild?.scrollHeight as number;
    }

    clear()
    {
        this.htmlElement.childNodes.forEach(node => {
            this.htmlElement.removeChild(node);
        })

        this.htmlElement.innerHTML = "";
    }
}