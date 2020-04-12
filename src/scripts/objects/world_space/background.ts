export class Background extends Phaser.GameObjects.Sprite{

    public static backgroundScrollSpeed: number = 2;
    
    constructor(assetKey: string, scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, assetKey, undefined);
        this.setOrigin(0,0);
        this.setDisplaySize(scene.game.config.width as number, scene.game.config.height as number);
        scene.add.existing(this);

    }
}