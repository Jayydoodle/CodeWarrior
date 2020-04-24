import { ActionType, EventType, ElementType, EffectType } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";
import { Effect } from "./Effect";
import { Action } from "./Action";

export class Spell extends Action {
    
    constructor(name: string, actionType: ActionType, value: number, mpCost: number, imageKey: string, imageFrames: number) {
        super(name, actionType, imageKey, imageFrames);
        this.value = value;
        this.mpCost = mpCost;
    }
}
export class BlackMagic extends Spell {

    attackPower: number;
    element: ElementType;

    constructor(name: string, element: ElementType, attackPower: number, mpCost: number, imageKey: string, imageFrames: number) {
        super(name, ActionType.Offense, attackPower, mpCost, imageKey, imageFrames);
        this.attackPower = attackPower;
        this.element = element;
    }
}
export class WhiteMagic extends Spell {

    effect: Effect;

    constructor(name: string, effectType: EffectType, value: number, mpCost: number, imageKey: string, imageFrames: number) {
        super(name, ActionType.Defense, value, mpCost, imageKey, imageFrames);
        this.effect = new Effect(value, effectType);
        this.emitter.on(EventType.ApplyEffects, this.addEffect, this);
    }
    addEffect(target: Character) {
        this.effect.addEffect(target);
    }
}
