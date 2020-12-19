import { readInput } from "../../common";

function main() {
  const input = readInput();

  const r = {
    a: 1,
    b: 0,
  };

  let i = 0;
  while (i < input.length) {
    const [x, y, z] = input[i].split(" ");
    switch (x) {
      case "hlf":
        r[y] /= 2;
        break;
      case "tpl":
        r[y] *= 3;
        break;
      case "inc":
        r[y]++;
        break;
      case "jmp":
        i += Number(y) - 1;
        break;
      case "jie":
        if (r[y[0]] % 2 === 0) {
          i += Number(z) - 1;
        }
        break;
      case "jio":
        if (r[y[0]] === 1) {
          i += Number(z) - 1;
        }
        break;

      default:
        throw new Error();
    }

    i++;
  }

  return r.b;
}

console.log(main());
