import { Character, Enemy } from "../objects/characters/Hero";
import { EnemyParty } from "../objects/characters/Party";
import { Depth } from "./Enumeration";

export class EnemyHud extends Phaser.GameObjects.Container{

    healthBars: Map<string, EnemyHudItem>;
    fullBar: number = 465;

    constructor(scene: Phaser.Scene, enemies: Enemy[])
    {
        super(scene);
        this.scene.add.existing(this);
        
        this.healthBars = new Map<string, EnemyHudItem>();

        var scale = 1;
        var healthGaugeStart = -400;
        var healthBarStart = 65;
        var nameTextStart = -550;

        for(var i = 0; i < enemies.length; i++)
        {
            var enemy = enemies[i];
            var currentHealthGuageStart =  healthGaugeStart + Math.abs(healthGaugeStart * i * 1.5);
            var currentHealthBarStart = healthBarStart + Math.abs(healthGaugeStart * i * 1.5);
            var currentNameTextStart = nameTextStart + Math.abs(nameTextStart * i * 1.05);

            let hudItem: EnemyHudItem = new EnemyHudItem();

            hudItem.healthGauge = new Phaser.GameObjects.Image(scene, currentHealthGuageStart, -60, "enemy_health_gauge");
            hudItem.healthBar = new Phaser.GameObjects.Image(scene, currentHealthBarStart, -70, "enemy_health");
            hudItem.nameText = new Phaser.GameObjects.Text(scene, currentNameTextStart, -140, "", { color:'#000000', fontSize: '30pt', fontStyle: 'bold', fontFamily: 'Aniron' } );
          
            hudItem.healthGauge.setScale(scale);
            hudItem.healthBar.setScale(scale);
            hudItem.healthBar.setCrop(0, 0, this.fullBar, 20);
    
            hudItem.healthBar.setTintFill(0xbf0a00);
    
            this.add(hudItem.healthGauge);
            this.add(hudItem.healthBar);
            this.add(hudItem.nameText);

            this.healthBars.set(enemy.name, hudItem);
            this.setDepth(Depth.GUI);
        }

        this.setScale(scene.game.config.width as number * .00035, scene.game.config.height as number * .0007);
    }

    update(character: Character)
    {
        var hudItem = this.healthBars.get(character.name) as EnemyHudItem;

        hudItem.nameText.text = character.name;

        var healthPercentage = character.getCurrentHp() / character.getMaxHp();
        hudItem.healthBar.setCrop(0, 0, this.fullBar * healthPercentage, 20);
    }

    updateAll(enemyParty: EnemyParty){
        enemyParty.group.forEach( member =>{
            this.update(member);
        });
    }
}

class EnemyHudItem {
    healthGauge: Phaser.GameObjects.Image;
    healthBar: Phaser.GameObjects.Image;
    nameText: Phaser.GameObjects.Text;
}