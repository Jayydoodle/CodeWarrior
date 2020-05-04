import { HudConfig } from "./Configuration";
import { Depth, EffectIconIndex } from "./Enumeration";
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

        this.setScale(scene.game.config.width as number * .0009, scene.game.config.height as number * .0017);
        this.setDepth(Depth.GUI);
    }

    update(character: Character)
    {
        let HudElement = this.findElementByKey(character.name);

        HudElement.healthText.text = character.getCurrentHp().toString();
        HudElement.mpText.text = character.getCurrentMp().toString();
        HudElement.tpText.text = character.getCurrentTp().toString();
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
    nameText: Phaser.GameObjects.Text;
    healthText: Phaser.GameObjects.Text;
    mpText: Phaser.GameObjects.Text;
    tpText: Phaser.GameObjects.Text;
    statusIcon: Phaser.GameObjects.Sprite;
    statusAnimationFrames: Phaser.Types.Animations.AnimationFrame[];
    statusAnimation: Phaser.Animations.Animation;

    constructor(scene: Phaser.Scene, name: string)
    {
        super(scene);
        
        this.hudDisplay = new Phaser.GameObjects.Image(scene, 0, 0, "hud_layout");
        this.statusIcon = new Phaser.GameObjects.Sprite(scene, 262, 0, "hud_icons");

        this.statusIcon.setFrame(0);

        /* must set container to non exclusive because we must add the statusIcon
        to the scene manually in order for the animation to render.  If this is 
        not set, scene loads will break because the statusIcon is in the scene
        display list */
        this.setExclusive(false);

        this.add(this.hudDisplay);
        this.add(this.statusIcon);

        this.nameText = this.addText(scene, name, -205, -9);
        this.healthText = this.addText(scene, "", -85, -13);
        this.mpText = this.addText(scene, "", 45, -13);
        this.tpText = this.addText(scene, "", 165, -13);

        this.createStatusAnimation(name, scene);
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
        
        this.statusAnimation.frames.forEach(frame => {
            this.statusAnimation.removeFrame(frame);
        });

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

