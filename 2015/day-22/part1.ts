const BOSS_HP = 51;
const BOSS_DAMAGE = 9;

interface Player {
  hp: number;
  mana: number;
  spent: number;
}

interface Effects {
  shield: number;
  poison: number;
  recharge: number;
}

enum Spell {
  magicMissile,
  drain,
  shield,
  poison,
  recharge,
}

let answer = Infinity;

function* round(
  effects: Effects,
  player: Player,
  bossHp: number,
  spell: Spell
): Generator<number> {
  effects = Object.assign({}, effects);
  player = Object.assign({}, player);

  // Player turn
  effects.shield--;
  if (effects.poison-- > 0) {
    bossHp -= 3;
    if (bossHp <= 0) {
      yield player.spent;
      return;
    }
  }
  if (effects.recharge-- > 0) {
    player.mana += 101;
  }

  // Cast spell
  let manaSpent: number;
  switch (spell) {
    case Spell.magicMissile:
      manaSpent = 53;
      bossHp -= 4;
      break;
    case Spell.drain:
      manaSpent = 73;
      player.hp += 2;
      bossHp -= 2;
      break;
    case Spell.shield:
      if (effects.shield > 0) {
        return;
      }
      manaSpent = 113;
      effects.shield = 6;
      break;
    case Spell.poison:
      if (effects.poison > 0) {
        return;
      }
      manaSpent = 173;
      effects.poison = 6;
      break;
    case Spell.recharge:
      if (effects.recharge > 0) {
        return;
      }
      manaSpent = 229;
      effects.recharge = 5;
      break;
    default:
      throw new Error();
  }
  if (player.mana < manaSpent) {
    return;
  }
  player.mana -= manaSpent;
  player.spent += manaSpent;

  if (player.spent >= answer) {
    return;
  }

  if (bossHp <= 0) {
    yield player.spent;
    return;
  }

  // Boss turn
  if (effects.poison-- > 0) {
    bossHp -= 3;
    if (bossHp <= 0) {
      yield player.spent;
      return;
    }
  }
  if (effects.recharge-- > 0) {
    player.mana += 101;
  }

  player.hp -= effects.shield-- > 0 ? BOSS_DAMAGE - 7 : BOSS_DAMAGE;
  if (player.hp <= 0) {
    return;
  }

  yield* getWinningCost(effects, player, bossHp);
}

function* getWinningCost(
  effects = { shield: 0, poison: 0, recharge: 0 },
  player = { hp: 50, mana: 500, spent: 0 },
  bossHp = BOSS_HP
): Generator<number> {
  yield* round(effects, player, bossHp, Spell.magicMissile);
  yield* round(effects, player, bossHp, Spell.drain);
  yield* round(effects, player, bossHp, Spell.shield);
  yield* round(effects, player, bossHp, Spell.poison);
  yield* round(effects, player, bossHp, Spell.recharge);
}

function main() {
  for (const winningCosts of getWinningCost()) {
    answer = winningCosts;
  }

  return answer;
}

console.log(main());
