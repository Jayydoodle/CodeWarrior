import { AlignGrid } from './AlignGrid';
import { AlignConfig } from './Configuration';

export class FormUtil {

    private scene: Phaser.Scene;
    public alignGrid: AlignGrid;
    private gameWidth: number;
    private gameHeight: number;

    constructor(config: AlignConfig) {
        //super();
        this.scene = config.scene;
        //get the game height and width
        this.gameWidth = config.width;
        this.gameHeight = config.height;

        this.alignGrid = new AlignGrid({
            scene: config.scene,
            rows: config.rows,
            cols: config.cols,
            height: config.height,
            width: config.width,
            showNumbers: config.showNumbers
        });
    }
    showNumbers() {
        this.alignGrid.showNumbers();
    }
    scaleToGameW(elName, percentage) {
        let el: HTMLElement = document.getElementById(elName) as HTMLElement;
        let w = this.gameWidth as number * percentage;
        el.style.width = w + "px";
    }
    scaleToGameH(elName, percentage) {
        let el:HTMLElement = document.getElementById(elName) as HTMLElement;
        let h = this.gameHeight as number * percentage;
        el.style.height = h + "px";
    }
    placeElementAt(index, elName, centerX = true, centerY = false) {

        //get the position from the grid
        var pos = this.alignGrid.getPosByIndex(index);
        //extract to local vars
        var x = pos.x;
        var y = pos.y;
        //get the element
        let el:HTMLElement = document.getElementById(elName) as HTMLElement;

        this.alignGrid.placeAtIndex(index, el);
        //set the position to absolute
        el.style.position = "absolute";
        //get the width of the element
        var w = el.style.width;
        //convert to a number
        let wAsInt = this.toNum(w);
        //
        //
        //center horizontal in square if needed
        if (centerX == true) {
            x -= wAsInt / 2;
        }
        //
        //get the height
        //        
        var h = el.style.height;
        //convert to a number
        let hAsInt = this.toNum(h);
        //
        //center verticaly in square if needed
        //
        if (centerY == true) {
            y -= hAsInt / 2;
        }
        //set the positions
        el.style.top = y + "px";
        el.style.left = x + "px";
    }
    //changes 100px to 100
    toNum(s) {
        s = s.replace("px", "");
        s = parseInt(s);
        return s;
    }
    //add a change callback
    addChangeCallback(elName, fun, scope = null) {
        let el:HTMLElement = document.getElementById(elName) as HTMLElement;
        if (scope == null) {
            el.onchange = fun;
        } else {
            el.onchange = fun.bind(scope);
        }
    }
    getTextAreaValue(elName) {
        let value = (document.getElementById(elName) as HTMLTextAreaElement).value;
        return value;
    }
    getTextValue(elName) {
        let el:HTMLElement = document.getElementById(elName) as HTMLElement;
        return el.innerText;
    }
}

