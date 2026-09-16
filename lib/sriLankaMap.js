// Real Sri Lanka boundary — Natural Earth 10m country data, pulled via the
// `world-atlas` npm package and pre-extracted by scripts/extract-sri-lanka.mjs
// into lib/sriLankaGeo.json (plain [lon,lat] polygon rings, no runtime
// GeoJSON/TopoJSON dependency needed). Re-run that script to refresh it.
import geo from "./sriLankaGeo.json";

const PAD = 0.06; // degrees of breathing room around the real bbox
const LON_MIN = geo.bbox.lonMin - PAD;
const LON_MAX = geo.bbox.lonMax + PAD;
const LAT_MIN = geo.bbox.latMin - PAD;
const LAT_MAX = geo.bbox.latMax + PAD;

export const MAP_H = 620;
export const MAP_W = Math.round(
  (MAP_H * (LON_MAX - LON_MIN)) / (LAT_MAX - LAT_MIN)
);

export function project([lon, lat]) {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * MAP_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H;
  return [x, y];
}

function ringToPath(ring) {
  return (
    ring
      .map(project)
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ") + " Z"
  );
}

// One path per polygon — the mainland plus a few small real islets
// (Mannar Island, Delft Island, etc.) that the dataset includes separately.
export const ISLAND_PATHS = geo.polygons
  .slice()
  .sort((a, b) => b.length - a.length)
  .map(ringToPath);

export const ISLAND_PATH = ISLAND_PATHS[0];

// The six Colombo-area outlets are genuinely only ~1-10km apart in real
// life — at this map's scale (the whole 430km-long island in ~620px,
// roughly 2.8km per pixel) that collapses to just a few px, however
// precisely their real coordinates are picked. Rather than let that push
// pins into the sea (a fixed-radius fan around a coastal point does
// exactly that — the earlier bug), they're offset from a shared, safely
// inland anchor. The offsets deliberately vary both angle and radius
// (instead of an evenly-spaced fan) so the cluster reads as a hand-placed,
// organic scatter rather than a perfect geometric hexagon — but every
// angle still stays within an EAST-FACING semicircle (roughly -85°..85°,
// i.e. never due-west), so every point stays on the inland side of the
// coast. Angles still run roughly north-to-south in the same order as
// these outlets' real latitudes, so the scatter still reads
// top-to-bottom the way the real city does.
const COLOMBO_ANCHOR = [79.88, 6.885];
const fan = (deg, r) => {
  const rad = (deg * Math.PI) / 180;
  return [Math.cos(rad) * r, Math.sin(rad) * r];
};

const COORDS = {
  "Wellampitiya Food Court": { at: COLOMBO_ANCHOR, offset: fan(-78, 41) },
  "Food Paradise Kolonnawa": { at: COLOMBO_ANCHOR, offset: fan(-49, 29) },
  "Bambalapitiya Flagship": { at: COLOMBO_ANCHOR, offset: fan(-13, 45) },
  "Bamba Food Court": { at: COLOMBO_ANCHOR, offset: fan(16, 26) },
  "Marine Drive": { at: COLOMBO_ANCHOR, offset: fan(48, 38) },
  "Mount Lavinia": { at: COLOMBO_ANCHOR, offset: fan(79, 33) },
  Jaffna: { at: [80.0255, 9.6615] },
  Trincomalee: { at: [81.2152, 8.5874] },
  Ampara: { at: [81.6747, 7.2975] },
  "Nuwara Eliya": { at: [80.7891, 6.9497] },
  Kandy: { at: [80.6337, 7.2906] },
  Negombo: { at: [79.8358, 7.2083] },
  Kurunegala: { at: [80.3647, 7.4863] },
  Galle: { at: [80.217, 6.0535] },
  Matara: { at: [80.555, 5.9485] },
  Batticaloa: { at: [81.7, 7.7167] },
};

export function pinPosition(name) {
  const entry = COORDS[name];
  if (!entry) return null;
  const [x, y] = project(entry.at);
  const [ox, oy] = entry.offset || [0, 0];
  return { x: x + ox, y: y + oy };
}
