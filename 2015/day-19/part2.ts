import { readInput } from "../../common";

function main() {
  const input = readInput();

  const molecule = input[input.length - 1];

  let simplerMolecule = molecule.replace(/[A-Z][a-z]?/g, (m) => {
    if (m === "Rn") return "<";
    if (m === "Ar") return ">";
    if (m === "Y") return "#";
    return "X";
  });

  let count = 0;
  let replacer = () => {
    count++;
    return "X";
  };

  while (simplerMolecule.length > 1) {
    simplerMolecule = simplerMolecule.replace(/X<X#X#X>/g, replacer);
    simplerMolecule = simplerMolecule.replace(/X<X#X>/g, replacer);
    simplerMolecule = simplerMolecule.replace(/X<X>/g, replacer);
    simplerMolecule = simplerMolecule.replace(/XX/g, replacer);
  }

  return count;
}

console.log(main());
