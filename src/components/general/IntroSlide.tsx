import React from "react";
import type { AllActivitiesStats } from "../../types";
import { getActivityIcon } from "../../utils";

interface Props {
  activitiesStats: NonNullable<AllActivitiesStats>;
}

export const IntroSlide: React.FC<Props> = ({ activitiesStats }) => {
  const activityList = activitiesStats.activitiesByType
    .map((a: { type: string }) => getActivityIcon(a.type))
    .join(" ");

  return (
    <div className="story-slide active flex flex-col justify-center items-center h-full w-full pt-0">
      <div className="slide-title">Your 2025</div>
      <div className="stat-value text-4xl my-12">Fitness (un)Wrapped</div>
      <div className="text-2xl my-4">{activityList}</div>
    </div>
  );
};
