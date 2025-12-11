import React from "react";
import type { AllActivitiesStats } from "../../types";
import { BigStatSlide } from "./BigStatSlide";
import { useUnit } from "../../contexts/UnitContext";
import { formatDistance, getDistanceLabel, kmToMiles } from "../../utils";

interface Props {
  activitiesStats: NonNullable<AllActivitiesStats>;
}

export const TotalDistanceSlide: React.FC<Props> = ({ activitiesStats }) => {
  const { unit, convertDistance } = useUnit();
  const totalKm = activitiesStats.totalDistance;
  const totalDistance = convertDistance(totalKm);
  const distanceLabel = getDistanceLabel(unit);

  const getFunDescription = (distanceInUnit: number): string => {
    const earthToMoonKm = 384400;
    const earthCircumferenceKm = 40075;
    const marathonKm = 42.195;
    const greatWallKm = 21000;
    const parisToNyKm = 5500;
    const londonToDubaiKm = 4000;
    const tourDeFranceKm = 3500;
    const italyKm = 1200;

    const earthToMoon = convertDistance(earthToMoonKm);
    const earthCircumference = convertDistance(earthCircumferenceKm);
    const greatWall = convertDistance(greatWallKm);
    const parisToNy = convertDistance(parisToNyKm);
    const londonToDubai = convertDistance(londonToDubaiKm);
    const tourDeFrance = convertDistance(tourDeFranceKm);
    const italy = convertDistance(italyKm);
    const marathon = convertDistance(marathonKm);

    const marathons = (distanceInUnit / marathon).toFixed(1);

    if (distanceInUnit > earthToMoon) {
      return `You could have reached the moon and back! 🌙`;
    }
    if (distanceInUnit > greatWall) {
      return `That's longer than the Great Wall of China! 🏯`;
    }
    if (distanceInUnit > earthCircumference) {
      return `You've gone all the way around the Earth! 🌍`;
    }
    if (distanceInUnit > 20000) {
      return `Halfway around the world and beyond! 🌏`;
    }
    if (distanceInUnit > parisToNy) {
      return `Like going from Paris to New York! 🗽`;
    }
    if (distanceInUnit > londonToDubai) {
      return `Like going from London to Dubai! 🏙️`;
    }
    if (distanceInUnit > tourDeFrance) {
      return `Like completing the Tour de France ${(distanceInUnit / tourDeFrance).toFixed(1)} times! 🚴`;
    }
    if (distanceInUnit > italy) {
      return `You walked the entire length of Italy! 🇮🇹`;
    }
    if (distanceInUnit > marathon) {
      return `That's ${marathons} marathons worth of effort! 🏃`;
    }
    return `Every step counts - keep crushing it! 💪`;
  };

  const description = getFunDescription(totalDistance);

  return (
    <BigStatSlide
      title="In total, you moved"
      value={formatDistance(totalKm, unit)}
      label={distanceLabel}
      description={description}
    />
  );
};
