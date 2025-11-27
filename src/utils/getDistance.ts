type DistanceArgs = {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
};

const deg2rad = (deg: number) => deg * (Math.PI / 180);
const isFullArgs = (args: Partial<DistanceArgs>): args is DistanceArgs =>
  Object.values(args).every(v => v !== undefined);


export function getDistanceMiles(args: Partial<DistanceArgs>) {
  if (!isFullArgs(args)) return;
  const {lat1, lon1, lat2, lon2} = args;

  const R = 3958.8; // Earth Radius miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}