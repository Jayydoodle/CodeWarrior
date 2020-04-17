import { ItemType, WeaponType, ArmorType, ElementType } from "../../utility/Enumeration";

export class Item{

    displayName: string;
    itemType: ItemType;
    isConsumable: boolean;
    imageKey: string;

    constructor(displayName: string, type: ItemType, isConsumable: boolean, imageKey: string)
    {
        this.displayName = displayName;
        this.itemType = type;
        this.isConsumable = isConsumable;
        this.imageKey = imageKey;
    }
}

export class Weapon extends Item{

    weaponType: WeaponType;
    attackPower: number;
    element: ElementType;

    constructor(displayName: string, type: WeaponType, element: ElementType,  attackPower: number, imageKey: string)
    {
        super(displayName, ItemType.Weapon, false, imageKey);
        this.weaponType = type;
        this.element = element;
        this.attackPower = attackPower;
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