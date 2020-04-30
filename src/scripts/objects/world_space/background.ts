export class Background extends Phaser.GameObjects.Sprite{

    public static backgroundScrollSpeed: number = 2;
    private gameWidth: number;
    private gameHeight: number;
    private initialY: number;
    private initialX: number;
    
    constructor(assetKey: string, scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, assetKey, undefined);
        this.setOrigin(0,0);
        this.initialY = y;
        this.initialX = x;
        this.setDisplaySize(scene.game.config.width as number, scene.game.config.height as number);
        scene.add.existing(this);

    }

    setImage(key: string, xOffet: number = 0, yOffset: number = 0)
    {
        this.setTexture(key);
        this.setOrigin(0,0);
        this.setDisplaySize(this.scene.game.config.width as number - xOffet, this.scene.game.config.height as number - yOffset);
        
        this.setY(this.initialY + yOffset / 2);
        this.setX(this.initialX + xOffet / 2);
    }
}