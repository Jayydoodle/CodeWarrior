import { HudConfig } from "./Configuration";
import { Depth, EffectIconIndex, ObjectScale } from "./Enumeration";
import { Character } from "../objects/characters/Hero";
import { BattleParty } from "../objects/characters/Party";

export class Hud extends Phaser.GameObjects.Container{

    private map: Map<string, HudElement>;
    private statusFrameMap: Map<Number, Phaser.Types.Animations.AnimationFrame>;

    constructor(scene: Phaser.Scene, config: HudConfig)
    {
        super(scene);
        this.scene.add.existing(this);

        this.map = new Map<string, HudElement>();
        this.statusFrameMap = new Map<Number, Phaser.Types.Animations.AnimationFrame>();
        
        let statusAnimationFrames = scene.anims.generateFrameNumbers("hud_icons", {
            frames: [EffectIconIndex.Posion, EffectIconIndex.Confuse, EffectIconIndex.Sleep, EffectIconIndex.Curse]
        }); 

        statusAnimationFrames.forEach(frame =>
        {
            this.statusFrameMap.set(frame.frame as Number, frame);
        });

        let warriorHud = new HudElement(scene, config.warriorName, config.warriorImageKey);
        let mageHud = new HudElement(scene, config.mageName, config.mageImageKey);
        let rangerHud = new HudElement(scene, config.rangerName, config.rangerImageKey);

        this.map.set(config.warriorName.toLowerCase(), warriorHud);
        this.map.set(config.mageName.toLowerCase(), mageHud);
        this.map.set(config.rangerName.toLowerCase(), rangerHud);

        this.add(warriorHud);
        this.add(rangerHud);
        this.add(mageHud);

        this.positionElement(mageHud, 0, 50);
        this.positionElement(rangerHud, 0, -50);

        this.setScale(scene.game.config.width as number * .0009, scene.game.config.height as number * .0017);
        this.setDepth(Depth.GUI);
    }

    update(character: Character)
    {
        let hudElement = this.findElementByKey(character.name);

        hudElement.update(character);
    }

    updateStatusAnimation(character: Character)
    {
        let hudElement = this.findElementByKey(character.name);

        hudElement.updateStatusAnimation(character, this.statusFrameMap);
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
    healthBar: Phaser.GameObjects.Image;
    mpBar: Phaser.GameObjects.Image;
    tpBar: Phaser.GameObjects.Image;
    nameText: Phaser.GameObjects.Text;
    healthText: Phaser.GameObjects.Text;
    mpText: Phaser.GameObjects.Text;
    tpText: Phaser.GameObjects.Text;
    characterIcon: Phaser.GameObjects.Sprite;
    statusIcon: Phaser.GameObjects.Sprite;
    statusAnimation: Phaser.Animations.Animation;

    fullBar: number = 105;

    constructor(scene: Phaser.Scene, name: string, imageKey: string)
    {
        super(scene);
        
        this.hudDisplay = new Phaser.GameObjects.Image(scene, 0, 0, "hud_layout");
        this.statusIcon = new Phaser.GameObjects.Sprite(scene, 262, 0, "hud_icons");
        this.characterIcon = new Phaser.GameObjects.Sprite(scene, -260, 0, imageKey);
        this.healthBar = new Phaser.GameObjects.Image(scene, 35, 7, "hud_health");
        this.mpBar = new Phaser.GameObjects.Image(scene, 168, 7, "hud_mp");
        this.tpBar = new Phaser.GameObjects.Image(scene, 291, 7, "hud_tp");

        this.healthBar.setCrop(0, 0, this.fullBar, 3);
        this.mpBar.setCrop(0, 0, this.fullBar, 3);
        this.tpBar.setCrop(0, 0, this.fullBar, 3);

        this.characterIcon.setScale(ObjectScale.Icon);

        this.statusIcon.setFrame(0);

        /* must set container to non exclusive because we must add the statusIcon
        to the scene manually in order for the animation to render.  If this is 
        not set, scene loads will break because the statusIcon is in the scene
        display list */
        this.setExclusive(false);

        this.add(this.hudDisplay);
        this.add(this.statusIcon);
        this.add(this.characterIcon);
        this.add(this.healthBar);
        this.add(this.mpBar);
        this.add(this.tpBar);

        this.nameText = this.addText(scene, name, -205, -9);
        this.healthText = this.addText(scene, "", -85, -13);
        this.mpText = this.addText(scene, "", 45, -13);
        this.tpText = this.addText(scene, "", 165, -13);

        this.createStatusAnimation(name, scene);
    }

    update(character: Character)
    {
        this.healthText.text = character.getCurrentHp().toString();
        this.mpText.text = character.getCurrentMp().toString();
        this.tpText.text = character.getCurrentTp().toString();

        var healthPercentage = character.getCurrentHp() / character.getMaxHp();
        var mpPercentage = character.getCurrentMp() / character.getMaxMp();
        var tpPercentage = character.getCurrentTp() / character.getMaxTp();

        this.healthBar.setCrop(0, 0, this.fullBar * healthPercentage, 3);
        this.mpBar.setCrop(0, 0, this.fullBar * mpPercentage, 3);
        this.tpBar.setCrop(0, 0, this.fullBar * tpPercentage, 3);
    }

    addText(scene: Phaser.Scene, value: string, xOffset: number, yOffset: number)
    {
        let text = new Phaser.GameObjects.Text(scene, 0, 0, value, { color:'#ffffff'} );
        this.add(text);
        text.setX(this.x + xOffset);
        text.setY(this.y + yOffset);

        return text;
    }

    createStatusAnimation(name: string, scene: Phaser.Scene)
    {
        // here is where we add the icon to the scene
        scene.add.existing(this.statusIcon);

        this.statusAnimation = this.statusIcon.anims.animationManager.create(
        {
            key: "status_"+name,
            frameRate: 1,
            repeat: -1
        }) as Phaser.Animations.Animation;
    }

    updateStatusAnimation(character: Character, statusFrameMap: Map<Number, Phaser.Types.Animations.AnimationFrame>)
    {
        this.statusIcon.anims.pause();
        
        this.statusAnimation.frames = [];

        console.log(character.statusEffects);

        character.statusEffects.forEach(effect =>{
            this.statusAnimation.addFrame([statusFrameMap.get(effect.effectIconIndex) as Phaser.Types.Animations.AnimationFrame]);
        });

        if(this.statusAnimation.frames.length > 0)
            this.statusIcon.play(this.statusAnimation.key, true);
        else{
            this.statusIcon.anims.stop();
            this.statusIcon.setFrame(0);
        }
    }
}

