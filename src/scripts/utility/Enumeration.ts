//#region Game

export enum ArmorType{

    Heavy,
    Light,
    Robe
}

export enum AttackDelay
{
    none = 0,
    veryFast = 400,
    fast = 800,
    slow = 1200,
    verySlow = 1600
}

export enum CharacterType
{
    enemy,
    player
}

export enum ElementType
{
    Earth,
    Fire,
    Ice,
    Light,
    Lightning,
    None,
    Water,
    Wind
}

export enum HeroType{
    Warrior = "warrior",
    Mage = "mage",
    Ranger = "ranger"
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

//#endregion

//#region Utility

export enum AssetType{

    Image,
    Sprite,
    BitmapFont,

}

export enum Depth
{
    background = 0,
    overlay = 1,
    characterSprite = 2,
    attacker = 3
}

export enum EventType
{
    attacking = "attacking",
    attackComplete = "attackComplete",
    btnApplyClicked = "btnApplyClicked",
    correctAnswer = "correctAnswer",
    infoTextUpdated = "infoTextUpdated",
    playerAttackComplete = "playerAttackComplete",
    turnEnded = "turnEnded",
    uiLoaded = "uiLoaded"
}

export enum GridPosition
{
    earthTop = 46,
    earthMiddle = 57,
    earthBottom = 68,
    earthEnemy = 51
}

export enum Message
{
    SyntaxError = "There is an error with your code, please try again.",
}

export enum ObjectScale
{
    battleScale = 3.5
}

export enum Scene
{
    UIScene = 'UIScene'
}

//#endregion