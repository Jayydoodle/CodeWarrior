import { HudConfig } from "./Configuration";
import { Depth } from "./Enumeration";
import { Character } from "../objects/characters/Hero";
import { BattleParty } from "../objects/characters/Party";

export class Hud extends Phaser.GameObjects.Container{

    private map: Map<string, HudElement>;

    constructor(scene: Phaser.Scene, config: HudConfig)
    {
        super(scene);
        this.scene.add.existing(this);

        this.map = new Map<string, HudElement>();

        let warriorHud = new HudElement(scene, config.warriorName);
        let mageHud = new HudElement(scene, config.mageName);
        let rangerHud = new HudElement(scene, config.rangerName);

        this.map.set(config.warriorName.toLowerCase(), warriorHud);
        this.map.set(config.mageName.toLowerCase(), mageHud);
        this.map.set(config.rangerName.toLowerCase(), rangerHud);

        this.add(warriorHud);
        this.add(rangerHud);
        this.add(mageHud);

        this.positionElement(mageHud, 0, 50);
        this.positionElement(rangerHud, 0, -50);

        this.setScale(1.6, 1.5);
        this.setDepth(Depth.GUI);
    }

    update(character: Character)
    {
        let HudElement = this.findElementByKey(character.name);

        HudElement.healthText.text = character.getCurrentHp().toString();
        HudElement.mpText.text = character.getCurrentMp().toString();
        HudElement.tpText.text = character.getCurrentTp().toString();
    }

    updateAll(battleParty: BattleParty)
    {
        battleParty.group.forEach( member =>{
            this.update(member);
        });
    }

    positionElement(element: HudElement, x, y)
    {
        element.setX(element.parentContainer.x + x);
        element.setY(element.parentContainer.y + y);
    }

    findElementByKey(key: string)
    {
        let element: HudElement| undefined = this.map.get(key.toLowerCase());

        if(element == undefined)
            throw "Hud element "+ "'" +key+ "'" +" Undefined";
        else
            return element;
    }
}

export class HudElement extends Phaser.GameObjects.Container{

    hudDisplay: Phaser.GameObjects.Image;
    nameText: Phaser.GameObjects.Text;
    healthText: Phaser.GameObjects.Text;
    mpText: Phaser.GameObjects.Text;
    tpText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, name: string)
    {
        super(scene);
        
        this.hudDisplay = new Phaser.GameObjects.Image(scene, 0, 0, "hud_layout");
        this.add(this.hudDisplay);

        this.nameText = this.addText(scene, name, -205, -9);
        this.healthText = this.addText(scene, "10000", -85, -13);
        this.mpText = this.addText(scene, "200", 45, -13);
        this.tpText = this.addText(scene, "100", 165, -13);
    }

    addText(scene: Phaser.Scene, value: string, xOffset: number, yOffset: number)
    {
        let text = new Phaser.GameObjects.Text(scene, 0, 0, value, { color:'#ffffff'} );
        this.add(text);
        text.setX(this.x + xOffset);
        text.setY(this.y + yOffset);

        return text;
    }
}

