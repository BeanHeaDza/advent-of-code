import md5 from "md5";
import memoizee from "memoizee";
import { readInput } from "../../common";

function md5Factory(salt: string) {
  return memoizee(
    (index: number) => {
      let hash = md5(salt + index);
      for (let x = 0; x < 2016; x++) {
        hash = md5(hash);
      }
      const triplet = hash.match(/(.)(?=\1{2})/)?.[0];
      const validators = hash.match(/(.)(?=\1{4})/g) || [];
      return { triplet, validators };
    },
    { max: 2000 }
  );
}

function main() {
  const [input] = readInput();
  const getNext = md5Factory(input);
  let index = 0;
  let count = 0;
  let triplet: string;
  while (count < 64) {
    if ((triplet = getNext(index).triplet)) {
      for (let x = index + 1; x <= index + 1000; x++) {
        if (getNext(x).validators.includes(triplet)) {
          count++;
          break;
        }
      }
    }
    index++;
  }

  return index - 1;
}

console.log(main());
