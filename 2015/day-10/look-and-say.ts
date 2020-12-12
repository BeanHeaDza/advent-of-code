export function lookAndSay(line: string): string {
  let previous: string;
  let count = 0;
  let output = "";

  for (const c of line) {
    if (c !== previous && count > 0) {
      output += `${count}${previous}`;
      count = 1;
    } else {
      count++;
    }
    previous = c;
  }
  if (count > 0) {
    output += `${count}${previous}`;
  }

  return output;
}
