import React from "react";
import type { AllActivitiesStats } from "../../types";
import { BigStatSlide } from "../shared/BigStatSlide";
import { getActivityIcon, formatDistance, getDistanceLabel } from "../../utils";
import { useUnit } from "../../contexts/UnitContext";

interface Props {
  activitiesStats: NonNullable<AllActivitiesStats>;
}

export const ActivitiesSummarySlide: React.FC<Props> = ({
  activitiesStats,
}) => {
  const { unit } = useUnit();
  const distanceLabel = getDistanceLabel(unit);

  return (
    <BigStatSlide title={`${activitiesStats!.year} in numbers`}>
      {/* Activities with icons */}
      <div className="text-xl my-8 leading-loose relative z-[1] flex flex-col items-center">
        {activitiesStats!.activitiesByType.map((a, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{getActivityIcon(a.type)}</span>
            <span>
              <strong>
                {a.type.charAt(0).toUpperCase() + a.type.slice(1)}:
              </strong>{" "}
              {formatDistance(a.totalDistance, unit)} {distanceLabel}
            </span>
          </div>
        ))}
      </div>
    </BigStatSlide>
  );
};
