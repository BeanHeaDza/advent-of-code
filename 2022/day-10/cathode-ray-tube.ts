export class CathodeRayTube {
  private registerX = 1;
  private cycle = 0;
  private handlers: ((register: number, cycle: number) => void)[] = [];

  addHandler(handler: CathodeRayTube["handlers"][0]) {
    this.handlers.push(handler);
  }

  removeHandler(handler: CathodeRayTube["handlers"][0]) {
    const i = this.handlers.indexOf(handler);
    i >= 0 && this.handlers.splice(i, 1);
  }

  execLine(line: string) {
    if (line === "noop") {
      this.noop();
    } else if (line.startsWith("addx ")) {
      const [value] = line.split(" ").slice(1).map(Number);
      this.addx(value);
    }
  }

  private callHandlers() {
    this.handlers.forEach((cb) => cb(this.registerX, this.cycle));
  }

  private noop() {
    this.cycle++;
    this.callHandlers();
  }

  private addx(val: number) {
    this.cycle++;
    this.callHandlers();
    this.cycle++;
    this.callHandlers();
    this.registerX += val;
  }
}
