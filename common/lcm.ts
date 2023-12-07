export function lcm(x: number, y: number) {
  return !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
}

function gcd(x: number, y: number) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}
