export function getFactors(num: number): number[] {
  const isEven = num % 2 === 0;
  const root = Math.sqrt(num);
  let inc = isEven ? 1 : 2;
  let factors = [1, num];

  for (let curFactor = isEven ? 2 : 3; curFactor <= root; curFactor += inc) {
    if (num % curFactor !== 0) continue;
    factors.push(curFactor, num / curFactor);
  }

  if (factors[factors.length - 1] === factors[factors.length - 2]) {
    factors.splice(factors.length - 1, 1);
  }

  return factors;
}
