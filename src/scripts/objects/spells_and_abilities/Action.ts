import { ActionType, EventType, Depth, Value, EffectType, ElementType } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";

export class Action{

    name: string;
    actionType: ActionType;
    imageKey: string;
    imageFrames: number;
    frameRate: number = Value.SpellFrameRate;
    repeat: number = 0;
    mpCost: number = 0;
    value: number = 0;
    public emitter: Phaser.Events.EventEmitter;

    constructor(name: string, actionType: ActionType, imageKey: string, imageFrames: number){
        this.name = name;
        this.actionType = actionType;
        this.imageKey = imageKey;
        this.imageFrames = imageFrames;
        this.emitter = new Phaser.Events.EventEmitter();
    }

    update()
    {

    }

    playAnimation(scene: Phaser.Scene, target?:Character)
    {
        let action = target != null ? new Phaser.Physics.Arcade.Sprite(scene, target.x, target.y, this.imageKey)
                                    : new Phaser.Physics.Arcade.Sprite(scene, scene.game.config.width as number / 2, 
                                                                       scene.game.config.height as number / 2, this.imageKey)

        scene.add.existing(action);
        scene.physics.add.existing(action);
        action.setDepth(Depth.Effect);

        if(target)
            action.setScale(2);
        else
            action.setDisplaySize(scene.game.canvas.width, scene.game.canvas.height);

        //scene.physics.moveToObject(action, target, 2000);

        action.anims.animationManager.create(
        {
            key: this.name+"_anim",
            frames: action.anims.animationManager.generateFrameNumbers(this.imageKey, { start: 0, end: this.imageFrames }),
            frameRate: this.frameRate,
            repeat: this.repeat
        });

        action.play(this.name+"_anim", true).once("animationcomplete-"+this.name+"_anim", () =>
        {
            action.body.velocity.setTo(0,0);
            action.destroy();
            this.emitter.emit(EventType.CastComplete);
            this.emitter.emit(EventType.ApplyEffects, target)
            this.emitter.removeAllListeners(EventType.CastComplete);
        });
    }
}

export class LimitBurst extends Action{

    constructor(name: string, value: number, effectType: EffectType, elementType: ElementType, imageKey: string, imageFrames: number){
        super(name, ActionType.Special, imageKey, imageFrames);
        this.value = value;
    }
}

