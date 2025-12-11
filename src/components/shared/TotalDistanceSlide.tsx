import React from "react";
import type { AllActivitiesStats } from "../../types";
import { BigStatSlide } from "./BigStatSlide";

interface Props {
  activitiesStats: NonNullable<AllActivitiesStats>;
}

export const TotalDistanceSlide: React.FC<Props> = ({ activitiesStats }) => {
  const totalKm = activitiesStats.totalDistance.toFixed(1);
  const totalDistance = activitiesStats.totalDistance;

  const getFunDescription = (distance: number): string => {
    const earthToMoon = 384400;
    const earthCircumference = 40075;
    const marathons = (distance / 42.195).toFixed(1);

    if (distance > earthToMoon) {
      return `You could have reached the moon and back! 🌙`;
    }
    if (distance > 21000) {
      return `That's longer than the Great Wall of China! 🏯`;
    }
    if (distance > earthCircumference) {
      return `You've gone all the way around the Earth! 🌍`;
    }
    if (distance > 20000) {
      return `Halfway around the world and beyond! 🌏`;
    }
    if (distance > 5500) {
      return `Like going from Paris to New York! 🗽`;
    }
    if (distance > 4000) {
      return `Like going from London to Dubai! 🏙️`;
    }
    if (distance > 3500) {
      return `Like completing the Tour de France ${(distance / 3500).toFixed(1)} times! 🚴`;
    }
    if (distance > 1200) {
      return `You walked the entire length of Italy! 🇮🇹`;
    }
    if (distance > 42.195) {
      return `That's ${marathons} marathons worth of effort! 🏃`;
    }
    return `Every step counts - keep crushing it! 💪`;
  };

  const description = getFunDescription(totalDistance);

  return (
    <BigStatSlide
      title="In total, you moved"
      value={totalKm}
      label="kilometers"
      description={description}
    />
  );
};
