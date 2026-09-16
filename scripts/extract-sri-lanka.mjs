// One-off script: extract Sri Lanka's real boundary from Natural Earth data
// (via the `world-atlas` npm package, 10m resolution) and write it out as
// plain [lon, lat] polygon rings for lib/sriLankaMap.js to project and draw.
// Run with: node scripts/extract-sri-lanka.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { feature } from "topojson-client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const topoPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "world-atlas",
  "countries-10m.json"
);
const topo = JSON.parse(readFileSync(topoPath, "utf-8"));

const geo = feature(topo, topo.objects.countries);
const sriLanka = geo.features.find(
  (f) => f.properties && f.properties.name === "Sri Lanka"
);

if (!sriLanka) {
  console.error(
    "Sri Lanka not found. Available names sample:",
    geo.features.slice(0, 5).map((f) => f.properties.name)
  );
  process.exit(1);
}

// Normalize to an array of polygons, each an array of [lon, lat] rings
// (outer ring only — Sri Lanka has no holes/lakes at this resolution).
let polygons;
if (sriLanka.geometry.type === "Polygon") {
  polygons = [sriLanka.geometry.coordinates[0]];
} else if (sriLanka.geometry.type === "MultiPolygon") {
  polygons = sriLanka.geometry.coordinates.map((poly) => poly[0]);
} else {
  throw new Error("Unexpected geometry type: " + sriLanka.geometry.type);
}

// Compute bounding box across all rings for the projection to fit later.
let lonMin = Infinity,
  lonMax = -Infinity,
  latMin = Infinity,
  latMax = -Infinity;
for (const ring of polygons) {
  for (const [lon, lat] of ring) {
    if (lon < lonMin) lonMin = lon;
    if (lon > lonMax) lonMax = lon;
    if (lat < latMin) latMin = lat;
    if (lat > latMax) latMax = lat;
  }
}

const out = {
  source: "Natural Earth (via world-atlas countries-10m.json)",
  bbox: { lonMin, lonMax, latMin, latMax },
  polygons, // array of rings; each ring is [[lon,lat], ...]
};

const outPath = path.join(__dirname, "..", "lib", "sriLankaGeo.json");
writeFileSync(outPath, JSON.stringify(out));
console.log(
  "Wrote",
  outPath,
  "-",
  polygons.length,
  "polygon(s), total points:",
  polygons.reduce((n, r) => n + r.length, 0)
);
console.log("bbox:", out.bbox);
