//#region Game

//#region Game
export enum ActionType {
    Offense,
    Defense,
    Recovery,
    Special
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

export enum AttackType
{
    Ability,
    Cast,
    LimitBurst,
    Regular
}

export enum HeroType{
    
    Magic = "mage",
    Melee = "warrior",
    Ranged = "ranger"
}

export enum BlackMagicLevel{

    I = 100,
    II = 200,
    III = 300
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
    Damage,
    DamageOverTime,
    DebuffDamage,
    DebuffDefense,
    MagicRecoveryOverTime,
    MagicRestoration,
    RecoveryOverTime,
    Restoration,
    Revival
}

export enum ItemType{

    Weapon,
    Armor
}

export enum Value{

    CastEffectOffset = 20,
    CastFrames = 5,
    CastFrameRate = 12,
    DeathFrames = 6,
    DeathFrameRate = 10,
    MaxEnemyMP = 999999,
    MaxTP = 100,
    MPCostBeginner = 10,
    MPCostIntermediate = 25,
    MPCostAdvanced = 50,
    SpellFrames = 100,
    SpellFrameRate = 30,
    StartingPlayerHealth = 20000,
    StartingPlayerMP = 50
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
    
    BitmapFont,
    Image,
    Sound,
    Sprite,
    Text
}

export enum Depth
{
    background = 0,
    overlay = 1,
    CharacterSprite = 2,
    Attacker = 3,
    Effect = 4,
    Cast = 5,
    GUI = 6
}

export enum EventType
{
    AnimationComplete = "animationComplete",
    ApplyEffects = "applyEffects",
    Attacking = "attacking",
    AttackComplete = "attackComplete",
    BtnApplyClicked = "btnApplyClicked",
    CastComplete = "castComplete",
    CharacterDefeated = "characterDefeated",
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
    battle = 3.5,
    castAnimation = 1.5,
    spell = 2,
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