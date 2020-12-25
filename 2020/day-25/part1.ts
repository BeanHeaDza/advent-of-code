import { readInput } from "../../common";

function calcLoop(publicKey: number) {
  let x = 0;
  let subjectNumber = 7;
  let value = 1;
  while (value !== publicKey) {
    x++;
    value *= subjectNumber;
    value = value % 20201227;
  }

  return x;
}

function decrypt(subject: number, loop: number) {
  let value = 1;
  for (let x = 0; x < loop; x++) {
    value *= subject;
    value = value % 20201227;
  }

  return value;
}

function main() {
  const [pubCard, pubDoor] = readInput().map(Number);
  const cardLoop = calcLoop(pubCard);

  const answer = decrypt(pubDoor, cardLoop);

  return answer;
}

console.log(main());
