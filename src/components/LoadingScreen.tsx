import React from "react";
import ConfettiBackground from "./shared/ConfettiBackground";

interface LoadingScreenProps {
  text: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text }) => {
  return (
    <div className="loading-container">
      <ConfettiBackground />
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingScreen;
