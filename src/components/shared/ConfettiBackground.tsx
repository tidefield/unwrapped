import React from "react";

interface ConfettiBackgroundProps {
  className?: string;
}

const ConfettiBackground: React.FC<ConfettiBackgroundProps> = ({
  className = "",
}) => {
  return (
    <div className={`celebration-bg ${className}`}>
      <span className="confetti" style={{ left: "10%", animationDelay: "0s" }}>
        🎉
      </span>
      <span className="confetti" style={{ left: "20%", animationDelay: "1s" }}>
        ✨
      </span>
      <span className="confetti" style={{ left: "30%", animationDelay: "2s" }}>
        🎊
      </span>
      <span
        className="confetti"
        style={{ left: "40%", animationDelay: "1.5s" }}
      >
        🏃
      </span>
      <span
        className="confetti"
        style={{ left: "50%", animationDelay: "0.5s" }}
      >
        💪
      </span>
      <span
        className="confetti"
        style={{ left: "60%", animationDelay: "2.5s" }}
      >
        🎯
      </span>
      <span
        className="confetti"
        style={{ left: "70%", animationDelay: "1.8s" }}
      >
        🌟
      </span>
      <span
        className="confetti"
        style={{ left: "80%", animationDelay: "0.3s" }}
      >
        🎈
      </span>
      <span
        className="confetti"
        style={{ left: "90%", animationDelay: "2.2s" }}
      >
        🎁
      </span>
      <span
        className="confetti"
        style={{ left: "15%", animationDelay: "1.2s" }}
      >
        🎨
      </span>
      <span
        className="confetti"
        style={{ left: "25%", animationDelay: "0.8s" }}
      >
        🎭
      </span>
      <span
        className="confetti"
        style={{ left: "35%", animationDelay: "2.7s" }}
      >
        🎪
      </span>
      <span
        className="confetti"
        style={{ left: "45%", animationDelay: "1.9s" }}
      >
        🎵
      </span>
      <span
        className="confetti"
        style={{ left: "55%", animationDelay: "0.4s" }}
      >
        🎸
      </span>
      <span
        className="confetti"
        style={{ left: "65%", animationDelay: "2.1s" }}
      >
        🎆
      </span>
      <span
        className="confetti"
        style={{ left: "75%", animationDelay: "1.3s" }}
      >
        🎇
      </span>
      <span
        className="confetti"
        style={{ left: "85%", animationDelay: "0.9s" }}
      >
        🥳
      </span>
      <span
        className="confetti"
        style={{ left: "95%", animationDelay: "2.3s" }}
      >
        🎊
      </span>
      <span className="confetti" style={{ left: "5%", animationDelay: "1.7s" }}>
        🎁
      </span>
      <span
        className="confetti"
        style={{ left: "12%", animationDelay: "2.9s" }}
      >
        🌈
      </span>
      <span
        className="confetti"
        style={{ left: "78%", animationDelay: "1.1s" }}
      >
        🎀
      </span>
      <span
        className="confetti"
        style={{ left: "88%", animationDelay: "0.6s" }}
      >
        🎉
      </span>
    </div>
  );
};

export default ConfettiBackground;
