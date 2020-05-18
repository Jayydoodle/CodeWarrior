# Game Name
Code Warrior

## Elevator Pitch

 Code Warrior is a classic RPG game that you play by writing code. The game incorporates all of the classic themes that have made games in this genre so successful, while also providing a learning experience. The objective of the game is to reinforce basic programming concepts, and thus every action in the game is performed by writing code. The player will engage in scripted ‘battles’ where they must utilize pre-defined variables and methods in a logical way to defeat the enemy. Each enemy will have an attack pattern that is visible to the player, and the goal is to design a basic algorithm to counter it. Therefore each enemy attack can be seen as a ‘bug’ in the code, where the player algorithm is the ‘patch’. 

## Influences (Brief)

- Elevator Saga game - https://play.elevatorsaga.com
  - Medium: Games
  - Explanation: The game 'Elevator Saga' is the heaviest influence for our game.  We had the idea to make a game where you play by writing coding and researched online to see if it had been done before.  This is how we discovered 'Elevator Saga', and it's structure served as the influence for how we structured our game.
  
- Turn-based RPG games
  - Medium: Games
  - Explanation: Our game incorporates many of the fantasy elements found in classic RPG games such as Chrono Trigger and the Final Fantasy series.

## Core Gameplay Mechanics (Brief)

- Play by programming: Gameplay will forego traditional input devices and be controlled by writing code

- Exploration: Players are placed in a game world where they must find certain items and complete certain objectives to advance in the game

- Equipment/Inventory: Equippable weapons/armor are found in the game and managed through an inventory system

- Turn based battle:  Turn-based battle featuring built-in coding problems

# Learning Aspects

## Learning Domains

Introductory javascript/Typescript

## Target Audiences

- New programmers who have taken at least one introductory programming course

- Experienced programmers who are fans of RPGs

## Target Contexts

- This game would be primarily be used as practice for students already learning basic programming

## Learning Objectives

- If/Else Statements: by the end of the game, students will be able to solve basic conditional tasks using an if/else statement

- Function calls: by the end of this game, students will be able to show how to call a given function and supply it with the correct arguments needed to run

## Prerequisite Knowledge

Prior to playing, students should be able to:
- Define and use if/else statements
- Call a function

## Assessment Measures

A timed assessment will be distributed before and after the game featuring problems similar to those faced during gameplay

# What sets this project apart?

- This game incorporates learning to code into a very popular genre of games

- The game can be used a learning tool, but mainly strives to be a game that is fun to play

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a single player game.  The player will interact with the game by writing code into a a code editor within the game window

## Player Modes

- Easy: Battles are turn-based and the player may stop and make decisions after each turn

- Normal: Battles are turn-based, but continous.  The enemy will continue attacking while you strategize

# Gameplay Objectives

- Primary Objective #1:
    - Description: write executable code to engage in battle with the enemy
    - Alignment: this aligns with the learning objectives because it gives students practice in calling functions and writing if/else         statements while playing the game
- Primary Objective #2:
    - Description: Defeat the final boss 
    - Alignment: Defeating the final boss means the player has mastered all of the coding challenges present in the game and is               therefore now a master of function calls and if/else statements

# Procedures/Actions

 - The battle state of the game will feature a mixture of predefined functions and raw code
  - Attack(); - Attack the enemy with the current player character
  - Cast(); - Cast the specified spell at the enemy or player character
  - LimitBurst(); - Use a special attack
 
# Rules

- A player has a certain amount of time to choose his attack plan for the enemy based on on-screen notifications
  and visual cues.  Ex. Enemy is preparing a strong attack!  This will let the player know that it would be wise for his next
  action to be to defend.  There will also be certain points during the battle where the player may need to satisfy some objective 
  other than simply attacking.  Ex. (if turn == 4) avoidTheRocksAboutToCrushYou
  
- Weapons and armor may also have an effect on the effectiveness of attack/defense

- Coding skill required to win increases with each battle

# Objects/Entities

- Three controllable player characters in the classes of warrior, mage, and ranger

- A main game window in the upper left corner of the screen, containing all of the game content, surrounded by UI panels including:
  - A code editor on the bottom right of the screen
  - A section containing 'submit' and 'reset' buttons to the right of the code editor, for submitting code or clearing the field
  - A text display on the right side of the screen for displaying instructions, hints, and challenges

## Core Gameplay Mechanics (Detailed)

- Play by programming: Gameplay will forego traditional input devices such as a mouse or gamepad and be controlled via writing code into a live text editor.  Everything from movement, inventory management, to battle will be handled via code.

- Turn based battle: Battle system will operate both by turn and by timer.  The player will have a set list of functions and variables they can use to
  come up with an attack plan for engaging with the enemy.  Success depends on the strength of the algorithm they have written, and their ability to 'debug' certain situations as they arrive.
    
## Feedback

Successful player attack results in a loss of enemy health, while an attack against the player results in a loss of player health.  This will be visible through health bars for both the player and the enemy, which once depleted will result in either victory or defeat.  Victory results in an uplifting victory theme song being played and 'loot' being dropped by the enmy, which the player must collect and use to advance in the story.  Defeat results in a dark, gloomy melody played and restarts the current battle

# Story and Gameplay

## Presentation of Rules

A welcome screen will explain the basic structure of the game and how to play.  Each game state will feature a list of available functions that a player can call, and hints on how to interact with the game.

## Presentation of Content

Earlier stages of the game will feature some hints on the nature of the problem asked - general structure of a for loop, etc.  But the structures that will be asked are expected to be somewhat familiar before the game is played.

## Story (Brief)

An evil presence has ascended upon the land.  You must harness the power of the elements (and show off your coding skills) to bring balance back to the world.

## Storyboarding

# Assets Needed

## Aethestics

The aesthetics should be reminiscent of old-school 2D RPG games in the style of Chrono Trigger, Final Fantasy, Dragon Warrior, etc.  A colorful game world with elemental themed zones.  Mild combat, no blood and gore.  Somewhat lightheartedly styled characters.

## Graphical

- Characters List
  - Warrior: one of the playable characters for the player
  - Mage: one of the playable characters for the player
  - Ranger: one of the playable characters for the player
  
- Textures:
  - Icons for weapons/armor and other inventory items

- Environment Art/Textures:
  - Fire zone: A background featuring red/organge lava and molten rock
  - Ice zone: A background featuring lots snow/ice.  White/light blue themed
  - Water zone: A background that is underwater or coastal
  - Earth zone: A background featuring mountains and trees.  Lots of brown/green

## Audio

- Music List (Ambient sound)
  - loading screen/start screen: calm flowing music
  - battle scene: exciting music to get the player going.

- Sound List (SFX)
  - battle: 
    - attack sounds
    - magic sounds
  - progression: 
    - player defeat music
    - player victory music

# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
