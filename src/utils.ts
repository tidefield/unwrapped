export const getActivityIcon = (type: string) => {
  const icons: Record<string, string> = {
    running: "🏃‍➡️",
    cycling: "🚴",
    swimming: "🏊",
    walking: "🚶‍♀️‍➡️",
    hiking: "🏔️",
    default: "🏃",
  };
  return icons[type.toLowerCase()] || icons.default;
};

export const kmToMiles = (km: number): number => km * 0.621371;
export const milesToKm = (miles: number): number => miles / 0.621371;

export const formatDistance = (
  distanceInKm: number,
  unit: "km" | "mile",
): string => {
  if (unit === "mile") {
    const miles = kmToMiles(distanceInKm);
    return `${miles.toFixed(1)}`;
  }
  return `${distanceInKm.toFixed(1)}`;
};

export const getDistanceLabel = (unit: "km" | "mile"): string => {
  return unit === "km" ? "kilometers" : "miles";
};
