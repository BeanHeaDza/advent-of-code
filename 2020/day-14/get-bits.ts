export function getBits(value: number, length: number) {
  let valueBits = value.toString(2);
  while (valueBits.length !== length) {
    valueBits = "0" + valueBits;
  }

  return valueBits;
}
