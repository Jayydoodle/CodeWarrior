export enum AssetType{

    Image,
    Sprite,
    BitmapFont,

}

export enum AttackDelay
{
    veryFast = 5000,
    fast = 10000,
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

export enum ObjectScale
{
    battleScale = 3.5
}

export enum Scene
{
    UIScene = 'UIScene'
}