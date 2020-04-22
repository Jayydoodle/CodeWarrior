//#region Game

export enum ActionType{

    Offense,
    Defense,
    Recovery
}

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

export enum HeroType{
    
    Magic = "mage",
    Melee = "warrior",
    Ranged = "ranger"
}

export enum CharacterType
{
    enemy,
    player
}

export enum ElementType
{
    Dark,
    Earth,
    Fire,
    Ice,
    Light,
    Lightning,
    None,
    Water,
    Wind
}

export enum EffectType
{
    AutoRevive,
    BuffDamage,
    BuffDefense,
    BuffMagicDamage,
    BuffMagicDefense,
    CureStatusEffects,
    DamageOverTime,
    DebuffDamage,
    DebuffDefense,
    MagicRecoveryOverTime,
    MagicRestoration,
    RecoveryOverTime,
    Restoration,
    Revive
}

export enum ItemType{

    Weapon,
    Armor
}

export enum BlackMagicLevel{

    I = 100,
    II = 200,
    III = 300
}

export enum Value{

    CastEffectOffset = 20,
    CastFrames = 5,
    CastFrameRate = 12,
    DeathFrames = 6,
    DeathFrameRate = 10,
    SpellFrames = 100,
    SpellFrameRate = 30,
    StartingPlayerHealth = 1000
}

export enum WeaponType{

    Melee,
    Ranged,
    Magic
}

export enum WhiteMagicLevel{

    I = 100,
    II = 200,
    III = 300
}


//#endregion

//#region Utility

//#endregion
//#region Utility
export enum AssetType {
    Image,
    Sprite,
    BitmapFont,
    Text
}

export enum Depth
{
    background = 0,
    overlay = 1,
    CharacterSprite = 2,
    Attacker = 3,
    Effect = 4,
    GUI = 5
}

export enum EventType
{
    AnimationComplete = "animationComplete",
    ApplyEffects = "applyEffects",
    Attacking = "attacking",
    AttackComplete = "attackComplete",
    BtnApplyClicked = "btnApplyClicked",
    CastComplete = "castComplete",
    EffectApplied = "effectApplied",
    InfoTextUpdated = "infoTextUpdated",
    UILoaded = "uiLoaded"
}

export enum GridPosition
{
    playerTop = 47,
    playerMiddle = 58,
    playerBottom = 69,
    enemyTop = 42,
    enemyMiddle = 51,
    enemyBottom = 60
}

export enum Message
{
    WhileNotAllowedError = "Keyword 'while' is not allowed",
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

export enum SceneType
{
    BattleScene,
    WorldScene
}

//#endregion