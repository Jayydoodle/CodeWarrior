import { Character } from "../objects/characters/Hero";

export class EnemyHud extends Phaser.GameObjects.Container{

    healthGauge: Phaser.GameObjects.Image;
    healthBar: Phaser.GameObjects.Image;
    nameText: Phaser.GameObjects.Text;
    fullBar: number = 464;

    constructor(scene: Phaser.Scene)
    {
        super(scene);
        this.scene.add.existing(this);

        this.healthGauge = new Phaser.GameObjects.Image(scene, 35, -60, "enemy_health_gauge");
        this.healthBar = new Phaser.GameObjects.Image(scene, 730, -70, "enemy_health");
        this.nameText = new Phaser.GameObjects.Text(scene, -150, -140, "", { color:'#000000', fontSize: '30pt', fontStyle: 'bold', fontFamily: 'Aniron' } );
        //this.nameText.setBackgroundColor("gray");

        this.healthGauge.setScale(1.5);
        this.healthBar.setScale(1.5);
        this.healthBar.setCrop(0, 0, 464, 20);

        this.healthBar.setTintFill(0xbf0a00);

        this.add(this.healthGauge);
        this.add(this.healthBar);
        this.add(this.nameText);

    }

    update(character: Character)
    {
        this.nameText.text = character.name;

        var healthPercentage = character.getCurrentHp() / character.getMaxHp();
        this.healthBar.setCrop(0, 0, this.fullBar * healthPercentage, 20);
    }
}