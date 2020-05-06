import { LimitBurst } from "./Action";
import { EffectType, ElementType, ActionType } from "../../utility/Enumeration";

export class LimitBurstDatabase{

    map: Map<string, LimitBurst>;

    constructor()
    {
        this.map = new Map<string, LimitBurst>();

        this.add(new LimitBurst("benediction", 999999, ActionType.Defense, [EffectType.Restoration, EffectType.RecoveryOverTime], ElementType.None, "lb_benediction", 100, { key: "lb_sound_heal" }));
        this.add(new LimitBurst("black hole", 500, ActionType.Offense, [EffectType.DebuffDamage], ElementType.None, "lb_collapse", 100));
        this.add(new LimitBurst("discharge", 500, ActionType.Offense, [ EffectType.Damage, EffectType.DamageOverTime ], ElementType.None, "lb_discharge", 100, { key: "lb_sound_lightning", volume: 0.8 }));
        this.add(new LimitBurst("freeze", 500, ActionType.Offense,[ EffectType.Damage ], ElementType.None, "lb_freeze", 100, { key: "lb_sound_ice" }));
        this.add(new LimitBurst("inferno", 500, ActionType.Offense, [ EffectType.Damage ], ElementType.None, "lb_inferno", 100, { key: "lb_sound_fire", volume: 0.8 }));
        this.add(new LimitBurst("luminescence", 500, ActionType.Defense, [ EffectType.CureStatusEffects, EffectType.MagicRestoration ], ElementType.None, "lb_luminescence", 100));
        this.add(new LimitBurst("nova", 500, ActionType.Offense, [ EffectType.Damage ], ElementType.None, "lb_nova", 100));
        this.add(new LimitBurst("resurrection", 500, ActionType.Defense, [ EffectType.Revival ], ElementType.None, "lb_resurrection", 100, { key: "lb_sound_revive" }));
        this.add(new LimitBurst("tempest", 500, ActionType.Offense, [ EffectType.Damage ], ElementType.None, "lb_tempest", 100, { key: "lb_sound_wind" }));
        this.add(new LimitBurst("torrent", 500, ActionType.Offense, [ EffectType.Damage ], ElementType.None, "lb_torrent", 100, { key: "lb_sound_water", volume: 0.8 }));
        this.add(new LimitBurst("upheaval", 500, ActionType.Offense, [ EffectType.Damage ], ElementType.None, "lb_upheaval", 100, { key: "lb_sound_earth"}));
    }

    add(lb: LimitBurst)
    {
        this.map.set(lb.name, lb);
    }

    findByName(key: string)
    {
        let lb: LimitBurst | undefined = this.map.get(key.toLowerCase());

        if(lb == undefined)
            throw "Limit Burst "+ "'" +key+ "'" +" Undefined";
        else
            return lb;
    }
}