export enum AssetType{

    Image,
    Sprite,
    BitmapFont,

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

export enum HeroType{
    Warrior = "warrior",
    Mage = "mage",
    Ranger = "ranger"
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