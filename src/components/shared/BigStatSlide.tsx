import React from "react";

interface SlideProps {
  title: string;
  value?: string | number;
  label?: string;
  description?: string;
  valueStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export const BigStatSlide: React.FC<SlideProps> = ({
  title,
  value,
  label,
  description,
  valueStyle,
  children,
}) => {
  return (
    <div className="story-slide active flex flex-col justify-center items-center h-full w-full min-w-[600px] pt-0">
      <div className="slide-header">🎁 Fitness (un)Wrapped</div>
      <div className="slide-title">{title}</div>
      {value && (
        <div className="stat-value" style={valueStyle}>
          {value}
        </div>
      )}
      {label && <div className="stat-label">{label}</div>}
      {description && <p>{description}</p>}
      {children}
    </div>
  );
};
