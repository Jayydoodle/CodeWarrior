import { Spell, BlackMagic, WhiteMagic } from "./Spell";
import { ElementType, BlackMagicLevel, EffectType, WhiteMagicLevel, Value, ActionType } from "../../utility/Enumeration";


export class SpellDatabase{

    spells: Map<string, Spell>;

    constructor(testSpells = true){

        this.spells = new Map<string, Spell>();

        if(testSpells)
        {
            this.testSpells();
            return;
        }

    //#region : General

        this.add(new Spell("sleep", ActionType.Special, EffectType.Ailment, 0, Value.MPCostIntermediate, "sleep", 100));
        this.add(new Spell("confuse", ActionType.Special, EffectType.Ailment, 0, Value.MPCostIntermediate, "confuse", 100));

    //#endregion

    //#region : Black Magic

        this.add(new BlackMagic("death", ElementType.Dark, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "death", 100));

        this.add(new BlackMagic("earth1", ElementType.Earth, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "earth_spell_1", 100));
        this.add(new BlackMagic("earth2", ElementType.Earth, EffectType.None, BlackMagicLevel.II, Value.MPCostIntermediate, "earth_spell_2", 100));
        //this.add(new BlackMagic("earth3", ElementType.Earth, EffectType.None, SpellLevel.III, Value.MPCostAdvanced, "earth_spell_3", 100));

        

        this.add(new BlackMagic("dark1", ElementType.Dark, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "dark_spell_1", 100));
        this.add(new BlackMagic("dark2", ElementType.Dark, EffectType.None, BlackMagicLevel.II, Value.MPCostIntermediate, "dark_spell_2", 100));
        this.add(new BlackMagic("dark3", ElementType.Dark, EffectType.None, BlackMagicLevel.III, Value.MPCostAdvanced, "dark_spell_3", 100));


        this.add(new BlackMagic("fire1", ElementType.Fire, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "fire_spell_1", 100));
        //this.add(new BlackMagic("fire2", ElementType.Fire, EffectType.None, SpellLevel.II, Value.MPCostIntermediate, "fire_spell_2", 100));
        //this.add(new BlackMagic("fire3", ElementType.Fire, EffectType.None, SpellLevel.III, Value.MPCostAdvanced "fire_spell_3", 100));


        this.add(new BlackMagic("ice1", ElementType.Ice, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "ice_spell_1", 100));
        this.add(new BlackMagic("ice2", ElementType.Ice, EffectType.None, BlackMagicLevel.II, Value.MPCostIntermediate, "ice_spell_2", 100));
        this.add(new BlackMagic("ice3", ElementType.Ice, EffectType.None, BlackMagicLevel.III, Value.MPCostAdvanced, "ice_spell_3", 100));

       
        this.add(new BlackMagic("lightning1", ElementType.Lightning, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "lightning_spell_1", 100));
        this.add(new BlackMagic("lightning2", ElementType.Lightning, EffectType.None, BlackMagicLevel.II, Value.MPCostIntermediate, "lightning_spell_2a", 100));
        this.add(new BlackMagic("lightning3", ElementType.Lightning, EffectType.None, BlackMagicLevel.III, Value.MPCostAdvanced, "lightning_spell_2b", 100));

        this.add(new BlackMagic("poison", ElementType.Dark, EffectType.DamageOverTime, BlackMagicLevel.I, Value.MPCostIntermediate, "poison", 100));

        this.add(new BlackMagic("water1", ElementType.Water, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "water_spell_1", 100));
        this.add(new BlackMagic("water2", ElementType.Water, EffectType.None, BlackMagicLevel.II, Value.MPCostIntermediate, "water_spell_2", 100));
        //this.add(new BlackMagic("water3", ElementType.Water, EffectType.None, SpellLevel.III, Value.MPCostAdvanced "water_spell_3", 100));


        this.add(new BlackMagic("wind1", ElementType.Wind, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "wind_spell_1", 100));
        this.add(new BlackMagic("wind2", ElementType.Wind, EffectType.None, BlackMagicLevel.II, Value.MPCostIntermediate, "wind_spell_2", 100));
        //this.add(new BlackMagic("wind3", ElementType.Wind, EffectType.None, SpellLevel.III, Value.MPCostAdvanced "wind_spell_3", 100));


    //#endregion

    //#region : White Magic

        this.add(new WhiteMagic("cure1", EffectType.Restoration, WhiteMagicLevel.I, Value.MPCostBeginner, "cure_spell_1", 300));
        this.add(new WhiteMagic("cure2", EffectType.Restoration, WhiteMagicLevel.II, Value.MPCostIntermediate, "cure_spell_2", 600));
        this.add(new WhiteMagic("cure3", EffectType.Restoration, WhiteMagicLevel.III, Value.MPCostAdvanced, "cure_spell_3", 900));
    

        this.add(new WhiteMagic("protect1", EffectType.BuffDefense, WhiteMagicLevel.I, Value.MPCostBeginner, "protect_spell_1", 100));
        this.add(new WhiteMagic("protect2", EffectType.BuffDefense, WhiteMagicLevel.II, Value.MPCostIntermediate, "protect_spell_2", 100));
        //this.add(new WhiteMagic("protect3", EffectType.BuffDefense, WhiteMagicLevel.III, Value.MPCostAdvanced, "protect_spell_3", 100));
    

        /*let shell1:WhiteMagic = new WhiteMagic("shell1", EffectType.BuffMagicDefense, WhiteMagicLevel.I, Value.MPCostBeginner, "shell_spell_1", 100);
        let shell2:WhiteMagic = new WhiteMagic("shell2", EffectType.BuffMagicDefense, WhiteMagicLevel.II, Value.MPCostIntermediate, "shell_spell_2", 100);
        let shell3:WhiteMagic = new WhiteMagic("shell3", EffectType.BuffMagicDefense, WhiteMagicLevel.III, Value.MPCostAdvanced, "shell_spell_3", 100);
    
        this.add(shell1);
        this.add(shell2);
        this.add(shell3);*/

        this.add(new WhiteMagic("remedy", EffectType.CureStatusEffects, 0, Value.MPCostIntermediate, "remedy_spell", 100));
        this.add(new WhiteMagic("raise", EffectType.Revival, 0, Value.MPCostAdvanced, "revive_spell", 100));


    //#endregion
    }

    add(spell: Spell)
    {
        this.spells.set(spell.name, spell);
    }

    findSpellByName(key: string)
    {
        let spell: Spell | undefined = this.spells.get(key.toLowerCase());

        if(spell == undefined)
            throw "Spell "+ "'" +key+ "'" +" Undefined";
        else
            return spell;
    }

    testSpells()
    {
        this.add(new BlackMagic("earth", ElementType.Earth, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "earth_spell_1", 100, { key: "earth_sound" }));
        this.add(new BlackMagic("dark", ElementType.Dark,  EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "dark_spell_3", 100, { key: "dark_sound" }));
        this.add(new BlackMagic("fire", ElementType.Fire, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "fire_spell_1", 100, { key: "fire_sound" }));
        this.add(new BlackMagic("ice", ElementType.Ice, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "ice_spell_1", 100, { key: "ice_sound" }));
        this.add(new BlackMagic("lightning", ElementType.Lightning, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "lightning_spell_1", 100, { key: "lightning_sound" }));
        this.add(new BlackMagic("poison", ElementType.Dark, EffectType.DamageOverTime, BlackMagicLevel.I, Value.MPCostIntermediate, "poison", 100, { key: "poison_sound" }));
        this.add(new BlackMagic("water", ElementType.Water, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "water_spell_2", 100, { key: "water_sound" }));
        this.add(new BlackMagic("wind", ElementType.Wind, EffectType.None, BlackMagicLevel.I, Value.MPCostBeginner, "wind_spell_1", 100, { key: "wind_sound" }));

        this.add(new BlackMagic("death", ElementType.Dark, EffectType.None, 999999, Value.MPCostBeginner, "death", 100, { key: "death_sound" }));

        this.add(new WhiteMagic("cure", EffectType.Restoration, WhiteMagicLevel.I, Value.MPCostBeginner, "cure_spell_3", 100, { key: "cure_sound" }));
        this.add(new WhiteMagic("protect", EffectType.BuffDefense, WhiteMagicLevel.I, Value.MPCostBeginner, "protect_spell_2", 100));
        this.add(new WhiteMagic("remedy", EffectType.CureStatusEffects, 0, Value.MPCostIntermediate, "remedy_spell", 100, { key: "remedy_sound" }));
        this.add(new WhiteMagic("raise", EffectType.Revival, 0, Value.MPCostAdvanced, "revive_spell", 100, { key: "revive_sound" }));

        this.add(new Spell("sleep", ActionType.Special, EffectType.Ailment, 0, Value.MPCostIntermediate, "sleep", 100, { key: "sleep_sound", volume: 0.5 }));
        this.add(new Spell("confuse", ActionType.Special, EffectType.Ailment, 0, Value.MPCostIntermediate, "confuse", 100, { key: "confuse_sound" }));
    }

}