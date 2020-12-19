import { sum } from "lodash";
import { combinations } from "../../common/combinations";

interface Item {
  name: string;
  cost: number;
  damage: number;
  armor: number;
}

interface Entity {
  HP: number;
  damage: number;
  armor: number;
}

const WEAPONS = [
  { name: "Dagger", cost: 8, damage: 4, armor: 0 },
  { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
  { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
  { name: "Longsword", cost: 40, damage: 7, armor: 0 },
  { name: "Greataxe", cost: 74, damage: 8, armor: 0 },
];

const ARMOR = [
  { name: "Leather", cost: 13, damage: 0, armor: 1 },
  { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
  { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
  { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
  { name: "Platemail", cost: 102, damage: 0, armor: 5 },
];

const RINGS = [
  { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
  { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
  { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
  { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
  { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
  { name: "Defense +3", cost: 80, damage: 0, armor: 3 },
];

function* pickWeapon(): Generator<Item> {
  for (const weapon of WEAPONS) {
    yield weapon;
  }
}

function* pickArmor(): Generator<Item> {
  yield { name: "None", cost: 0, damage: 0, armor: 0 };
  for (const armor of ARMOR) {
    yield armor;
  }
}

function* pickRing(): Generator<Item[]> {
  yield [];
  for (const ring of RINGS) {
    yield [ring];
  }
  for (const rings of combinations(RINGS, 2)) {
    yield rings;
  }
}

function* pickSet(): Generator<Item[]> {
  for (const weapon of pickWeapon()) {
    for (const armor of pickArmor()) {
      for (const rings of pickRing()) {
        yield [weapon, armor, ...rings];
      }
    }
  }
}

function playerWin(player: Entity, boss: Entity) {
  let playerDamage = Math.max(player.damage - boss.armor, 1);
  let bossDamage = Math.max(boss.damage - player.armor, 1);

  let playerKill = Math.ceil(boss.HP / playerDamage);
  let bossKill = Math.ceil(player.HP / bossDamage);

  return playerKill <= bossKill;
}

function main() {
  let boss = {
    HP: 109,
    damage: 8,
    armor: 2,
  };

  let answer = Infinity;

  for (const set of pickSet()) {
    let cost = sum(set.map((i) => i.cost));
    if (cost >= answer) continue;

    let player = {
      HP: 100,
      damage: sum(set.map((i) => i.damage)),
      armor: sum(set.map((i) => i.armor)),
    };

    if (playerWin(player, boss)) {
      answer = cost;
    }
  }

  return answer;
}

console.log(main());
