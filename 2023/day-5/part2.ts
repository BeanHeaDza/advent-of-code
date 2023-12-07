import { min } from "lodash";
import { readInput } from "../../common";

interface Mapping {
  start: number;
  /** Exclusive */
  end: number;
  adj: number;
}

function main() {
  const input = readInput();
  const temp = [...input[0].matchAll(/\d+/g)].map((x) => +x[0]);
  let seedRanges: { start: number; end: number }[] = [];
  for (let i = 0; i < temp.length; i += 2) {
    seedRanges.push({ start: temp[i], end: temp[i] + temp[i + 1] });
  }

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

  for (const mapping of mappings) {
    const next = seedRanges.slice(0, 0);
    for (const seedRange of seedRanges) {
      let foundMapping = false;
      for (const { start, end, adj } of mapping) {
        const startInside = seedRange.start >= start && seedRange.start < end;
        const endInside = seedRange.end > start && seedRange.end <= end;
        if (startInside && endInside) {
          next.push({ start: seedRange.start + adj, end: seedRange.end + adj });
          foundMapping = true;
          break;
        } else if (startInside) {
          next.push({ start: seedRange.start + adj, end: end + adj });
          seedRanges.push({ start: end, end: seedRange.end });
          foundMapping = true;
          break;
        } else if (endInside) {
          next.push({ start: start + adj, end: seedRange.end + adj });
          seedRanges.push({ start: seedRange.start, end: start });
          foundMapping = true;
          break;
        }
      }
      if (!foundMapping) {
        next.push(seedRange);
      }
    }
    seedRanges = next;
  }

  return min(seedRanges.map((x) => x.start));
}

console.log(main());
