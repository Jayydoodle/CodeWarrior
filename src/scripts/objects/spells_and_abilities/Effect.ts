import { EffectType, EventType } from "../../utility/Enumeration";
import { Character } from "../characters/Hero";

export class Effect{

    effectType: EffectType;
    duration: number;
    value: number;

    constructor(effectType: EffectType, value: number)
    {
        this.effectType = effectType;
        this.value = value;
    }

    addEffect(target: Character)
    {
        switch(this.effectType)
        {
            case EffectType.Restoration:
                this.heal(target);
                break;
            default:
                break;
        }
    }

    heal(target: Character)
    {
        target.recoverHealth(this.value);
        let message = target.name + " recovered " + this.value + " HP ";
        target.emitEffectApplied(message);
    }
}