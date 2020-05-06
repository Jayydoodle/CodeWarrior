import { ItemType, WeaponType, ArmorType, ElementType } from "../../utility/Enumeration";
import { AudioConfig } from "../../utility/Configuration";

export class Item{

    displayName: string;
    itemType: ItemType;
    isConsumable: boolean;
    imageKey: string;
    audioConfig: AudioConfig;

    constructor(displayName: string, type: ItemType, isConsumable: boolean, imageKey: string, audioConfig?: AudioConfig)
    {
        this.displayName = displayName;
        this.itemType = type;
        this.isConsumable = isConsumable;
        this.imageKey = imageKey;
        
        if(audioConfig)
            this.audioConfig = audioConfig;
    }
}

export class Weapon extends Item{

    weaponType: WeaponType;
    attackPower: number;
    element: ElementType;
    effectKey: string;
    effectFrames: number;

    constructor(displayName: string, type: WeaponType, element: ElementType,  attackPower: number, imageKey: string, 
                effectKey: string, effectFrames: number, audioConfig: AudioConfig)
    {
        super(displayName, ItemType.Weapon, false, imageKey, audioConfig);
        this.weaponType = type;
        this.element = element;
        this.attackPower = attackPower;
        this.effectKey = effectKey;
        this.effectFrames = effectFrames;
    }
}

export class Armor extends Item{

    armorType: ArmorType;
    mitigation: number;
    element: ElementType;
    elementWeakness: ElementType;

    constructor(displayName: string, type: ArmorType, mitigation: number, element: ElementType, elementWeakness: ElementType, imageKey: string)
    {
        super(displayName, ItemType.Armor, false, imageKey);
        this.armorType = type;
        this.mitigation = mitigation;
        this.element = element;
        this.elementWeakness = elementWeakness;
    }
}