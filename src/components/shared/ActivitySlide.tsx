import React from "react";
import type { AllActivitiesStats } from "../../types";
import { BigStatSlide } from "./BigStatSlide";

interface Props {
  activity: NonNullable<AllActivitiesStats>["activitiesByType"][0];
}

const getActivityTitle = (activityType: string): string => {
  const type = activityType.toLowerCase();

  const activityMap: Record<string, string> = {
    running: "You ran",
    walk: "You walked",
    walking: "You walked",
    swimming: "You swam",
    cycling: "You cycled",
    bike: "You biked",
    biking: "You biked",
    hiking: "You hiked",
  };

  return activityMap[type] || `You did ${activityType}`;
};

export const ActivitySlide: React.FC<Props> = ({ activity }) => {
  const bestMonth = activity.bestMonth.month;
  const title = getActivityTitle(activity.type);

  return (
    <BigStatSlide
      title={title}
      value={activity.totalDistance.toFixed(1)}
      label={`kilometers in ${activity.totalMonths} months`}
      description={`Best month: ${bestMonth} (${activity.bestMonth.distance.toFixed(1)} km)`}
    />
  );
};
