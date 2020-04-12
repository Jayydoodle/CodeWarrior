import { Depth } from "./Enumeration";
import { AlignConfig } from "./Configuration";

export class AlignGrid {

    private scene: Phaser.Scene;
    private graphics: Phaser.GameObjects.Graphics;
    private config: AlignConfig;
    private ch: number;
    private cw: number;
    private color: string;

    constructor(config: AlignConfig) {

        this.config = config;

        this.scene = config.scene;
        //cell width
        this.cw = config.width / config.cols;
        //cell height
        this.ch = config.height / config.rows;

        this.color = "0xffffff";

        if(config.showNumbers)
            this.showNumbers();
    }
    show() {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xffffff);
        for (var i = 0; i < this.config.width; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.config.height);
        }
        for (var i = 0; i < this.config.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.config.width, i);
        }
        this.graphics.strokePath();
    }
    placeAt(xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }
    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.config.cols);
        var xx = index - (yy * this.config.cols);
        this.placeAt(xx, yy, obj);
    }
    findNearestIndex(xx, yy) {
        var row = Math.floor(yy / this.ch);
        var col = Math.floor(xx / this.cw);
        console.log("row=" + row);
        console.log("col=" + col);
        var index = (row * this.config.cols) + col;
        return index;
    }
    getPosByIndex(index) {
        var yy = Math.floor(index / this.config.cols);
        var xx = index - (yy * this.config.cols);
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        return {
            x: x2,
            y: y2
        }
    }
    showNumbers() {
        this.show();
        var count = 0;
        for (var i = 0; i < this.config.rows; i++) {
            for (var j = 0; j < this.config.cols; j++) {
                var numText = this.scene.add.text(0, 0, count.toString(), {
                    color: '#' + this.color.toString().substr(2, 6),
                    font: 'bold 30pt Arial'
                });
                numText.setOrigin(0.5, 0.5);
                numText.setDepth(Depth.overlay);
                this.placeAtIndex(count, numText);
                count++;
            }
        }
    }
}
