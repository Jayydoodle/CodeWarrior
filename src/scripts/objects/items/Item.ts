export class Item extends Phaser.GameObjects.Sprite{

    displayName: string;
    itemType: ItemType;
    isConsumable: boolean;

    constructor(scene: Phaser.Scene, displayName: string, type: ItemType, isConsumable: boolean, imageSource: string)
    {
        super(scene, 0, 0, imageSource);
        this.displayName = displayName;
        this.itemType = type;
        this.isConsumable = isConsumable;

    }
}

export class Weapon extends Item{

    weaponType: WeaponType;

    constructor(scene: Phaser.Scene, displayName: string, type: WeaponType, imageSource: string)
    {
        super(scene, displayName, ItemType.Weapon, false, imageSource);
        this.weaponType = type;
    }
}

export class Armor extends Item{

    armorType: ArmorType;

    constructor(scene: Phaser.Scene, displayName: string, type: ArmorType, imageSource: string)
    {
        super(scene, displayName, ItemType.Armor, false, imageSource);
        this.armorType = type;
    }
}

export enum ItemType{

    Weapon,
    Armor
}

export enum WeaponType{

    Melee,
    Ranged,
    Magic
}

export enum ArmorType{

    Heavy,
    Light,
    Robe
}