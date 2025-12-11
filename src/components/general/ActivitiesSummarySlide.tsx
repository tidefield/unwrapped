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
      <div
        style={{
          fontSize: "1.4rem",
          margin: "2rem 0",
          lineHeight: 2,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {activitiesStats!.activitiesByType.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>
              {getActivityIcon(a.type)}
            </span>
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
