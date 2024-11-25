import { Reader } from 'maxmind';
import * as fs from "node:fs";
const cityDBPath = process.cwd() + "/maxmind/GeoLite2-City.mmdb";
const cityBuffer = fs.readFileSync(cityDBPath);
export const cityDB = new Reader(cityBuffer);
