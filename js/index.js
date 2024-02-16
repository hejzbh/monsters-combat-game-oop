"use strict";

// Task: Create a game called "Monsters Combat"

//   Game description:
// - In the game, there are 2 monsters (Skeleton and Spider) and they fight each other
// - Each of them has its own attacks. Some have more, and some have fewer. Each attack has a specific damage it deals.
// - The Skeleton has less health but stronger hits, whereas the Spider is the opposite
// - The attack is chosen via a random number (0-monster.attacks.length);
// - If a monster gets 2 or more consecutive attacks, its health decreases by 10, as it is considered tired.

// How to play
// By clicking the 'Attack' button, we control the game.
// Upon clicking, we generate a number from 0 to 100. If the number is greater than 50, the attacker is the first monster in the game, if the number is less than 50, the attacker is the second monster.
// - The first one to lose all health is the loser.

//-----------------------------------------------------------------------------
const attackBTN = document.querySelector(".attack-btn");

const gameData = {
  skeleton: {
    name: "Skeleton",
    health: 120,
    attacks: [
      {
        name: "Arrow",
        damage: 20,
      },
      {
        name: "Bone Crush",
        damage: 8,
      },
    ],
  },
  spider: {
    name: "Spider",
    health: 100,
    attacks: [
      {
        name: "Venomous Bite",
        damage: 25,
      },
      {
        name: "Web Shot",
        damage: 22,
      },
      {
        name: "Acid Spray",
        damage: 6,
      },
    ],
  },
  SELF_DAMAGE_VALUE: 10,
};

let previousAttackerId;
let monstersInGame = [];
let monsterAttackerIdx = 0;

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// 1) Monster Class
class Monster {
  constructor(name, health, attacks) {
    this.name = name;
    this.health = health;
    this.attacks = attacks;
    this.id = Math.random();
  }

  _attack(enemyMonster) {
    // 1) Get attack random number
    const randomNumber = Math.floor(Math.random() * this.attacks.length);
    // 2) Get attack
    const attack = this.attacks[randomNumber];
    // 3) Injure the enemy
    enemyMonster.damage = attack.damage;
    // 3) If monster gets attack 2> times in row;
    if (previousAttackerId === this.id) {
      // -10 health, he got tired
      this.damage = gameData.SELF_DAMAGE_VALUE;
      // Log message to the console
      this._actionLog({ damage: gameData.SELF_DAMAGE_VALUE }, this);
    }

    // 4) Set previousAttackerId to current attacker. (we need to know for next time who was previous attacker)
    previousAttackerId = this.id;

    // 5) Log message to thec onsole
    this._actionLog(attack, enemyMonster);
  }

  _actionLog(attack, enemyMonster) {
    // Self attack
    if (enemyMonster.id === this.id) {
      console.log(
        `🎇 ${this.name} attacked the opponent twice and got tired (-${attack.damage} health)`
      );
      console.log(`🎇Current health: ${this.getHealth}`);
    }
    // Attack to enemy
    else {
      console.log(
        `🧨 ${this.name} attacked the ${enemyMonster.name} and inflicted damage of: ${attack.damage}`
      );
      console.log(`🧨${enemyMonster.name}'s health: ${enemyMonster.getHealth}`);
    }
  }

  get getHealth() {
    return this.health;
  }

  set damage(attackValue) {
    this.health -= attackValue;
  }
}

// 2) Spider Class
class Spider extends Monster {
  constructor(name, health, attacks) {
    super(name, health, attacks);
  }
}

// 3) Skeleton Class
class Skeleton extends Monster {
  constructor(name, health, attacks) {
    super(name, health, attacks);
  }
}

// -----------------------------------
// 4) Create monsters
const spiderMonster = new Spider(
  gameData.spider.name,
  gameData.spider.health,
  gameData.spider.attacks
);

const skeletonMonster = new Skeleton(
  gameData.skeleton.name,
  gameData.skeleton.health,
  gameData.skeleton.attacks
);

// Add monsters into the game
monstersInGame.push(skeletonMonster, spiderMonster);

// ------------------------------------------------

// 5) Control the game
attackBTN.addEventListener("click", () => {
  // 1)
  const randomAttackerNumber = Math.floor(Math.random() * 100) + 1;
  // 2) Index of monster who attacks
  monsterAttackerIdx = randomAttackerNumber > 50 ? 0 : 1;
  // 3) The attacking monster and the monster receiving the attack (blow).
  const attackerMonster = monstersInGame[monsterAttackerIdx];
  const enemyMonster = monstersInGame[monsterAttackerIdx === 0 ? 1 : 0];
  // 4) Attack!
  attackerMonster._attack(enemyMonster);
  // 5) Is there a loser?
  const loser = monstersInGame.find((monster) => monster.getHealth <= 0);
  // If loser exists
  if (loser) {
    alert(loser.name + " is the loser!");
  }
});
