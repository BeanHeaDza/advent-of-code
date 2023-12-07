import { readInput } from "../../common";

interface Mapping {
  start: number;
  /** Exclusive */
  end: number;
  adj: number;
}

function main() {
  const input = readInput();
  const seeds = [...input[0].matchAll(/\d+/g)].map((x) => +x[0]);

  const seedToSoil: Mapping[] = [];
  const SoilToFert: Mapping[] = [];
  const FertToWater: Mapping[] = [];
  const WaterToLight: Mapping[] = [];
  const LightToTemp: Mapping[] = [];
  const TempToHumid: Mapping[] = [];
  const HumidToLocation: Mapping[] = [];

  var currentMap: Mapping[] | undefined;

  for (const line of input) {
    if (!line) continue;
    if (line === "seed-to-soil map:") {
      currentMap = seedToSoil;
    }
    if (line === "soil-to-fertilizer map:") {
      currentMap = SoilToFert;
    }

    if (line === "fertilizer-to-water map:") {
      currentMap = FertToWater;
    }

    if (line === "water-to-light map:") {
      currentMap = WaterToLight;
    }

    if (line === "light-to-temperature map:") {
      currentMap = LightToTemp;
    }

    if (line === "temperature-to-humidity map:") {
      currentMap = TempToHumid;
    }
    if (line === "humidity-to-location map:") {
      currentMap = HumidToLocation;
    }

    const mappings = [...line.matchAll(/\d+/g)].map((x) => +x[0]);
    if (currentMap && mappings.length) {
      currentMap.push({
        start: mappings[1],
        end: mappings[1] + mappings[2],
        adj: mappings[0] - mappings[1],
      });
    }
  }

  let answer = Number.MAX_VALUE;

  const mappings = [
    seedToSoil,
    SoilToFert,
    FertToWater,
    WaterToLight,
    LightToTemp,
    TempToHumid,
    HumidToLocation,
  ];

  for (const seed of seeds) {
    let value = seed;
    for (const mapping of mappings) {
      for (const x of mapping) {
        if (value >= x.start && value < x.end) {
          value += x.adj;
          break;
        }
      }
    }

    if (value < answer) {
      answer = value;
    }
  }

  return answer;
}

console.log(main());
