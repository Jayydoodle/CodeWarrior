import { LimitBurst } from "./Action";
import { EffectType, ElementType } from "../../utility/Enumeration";

export class LimitBurstDatabase{

    map: Map<string, LimitBurst>;

    constructor()
    {
        this.map = new Map<string, LimitBurst>();

        this.add(new LimitBurst("benediction", 500, EffectType.Restoration, ElementType.None, "lb_benediction", 100));
        this.add(new LimitBurst("black hole", 500, EffectType.Restoration, ElementType.None, "lb_collapse", 100));
        this.add(new LimitBurst("discharge", 500, EffectType.Restoration, ElementType.None, "lb_discharge", 100));
        this.add(new LimitBurst("freeze", 500, EffectType.Restoration, ElementType.None, "lb_freeze", 100));
        this.add(new LimitBurst("inferno", 500, EffectType.Restoration, ElementType.None, "lb_inferno", 100));
        this.add(new LimitBurst("luminescence", 500, EffectType.Restoration, ElementType.None, "lb_luminescence", 100));
        this.add(new LimitBurst("nova", 500, EffectType.Restoration, ElementType.None, "lb_nova", 100));
        this.add(new LimitBurst("resurrection", 500, EffectType.Restoration, ElementType.None, "lb_resurrection", 100));
        this.add(new LimitBurst("tempest", 500, EffectType.Restoration, ElementType.None, "lb_tempest", 100));
        this.add(new LimitBurst("torrent", 500, EffectType.Restoration, ElementType.None, "lb_torrent", 100));
        this.add(new LimitBurst("upheaval", 500, EffectType.Restoration, ElementType.None, "lb_upheaval", 100));
    }

    add(lb: LimitBurst)
    {
        this.map.set(lb.name, lb);
    }

    findByName(key: string)
    {
        let lb: LimitBurst | undefined = this.map.get(key.toLowerCase());

        if(lb == undefined)
            throw "Limit Bust "+ "'" +key+ "'" +" Undefined";
        else
            return lb;
    }
}