import { sum } from "lodash";
import { readInput } from "../../common";

function sumObject(obj: any) {
  if (typeof obj === "number") {
    return obj;
  }

  if (obj !== null && typeof obj === "object") {
    if (Array.isArray(obj)) {
      return sum(obj.map(sumObject));
    }
    if (Object.values(obj).includes("red")) {
      return 0;
    }
    return sum([...Object.values(obj)].map(sumObject));
  }
}

function main() {
  let input = JSON.parse(readInput().join(" "));

  return sumObject(input);
}

console.log(main());
