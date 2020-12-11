export function createGrid(init: any, ...dimensions: number[]) {
  if (dimensions.length === 0) {
    return init;
  }

  const x = dimensions[dimensions.length - 1];

  let output = [];
  for (let i = 0; i < x; i++) {
    output.push(
      createGrid(init, ...dimensions.slice(0, dimensions.length - 1))
    );
  }
  return output;
}
