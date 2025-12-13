import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="privacy-note mt-4">
      <span>
        💙 Love this?{" "}
        <a
          href="https://buymeacoffee.com/tidefield"
          target="_blank"
          rel="noopener"
          className="text-brand-blue underline font-semibold"
        >
          Buy me a coffee
        </a>{" "}
        ☕
      </span>
      <span>
        or{" "}
        <a
          href="https://forms.gle/LQm8MAkahjd5zWvA6"
          target="_blank"
          className="text-brand-blue underline font-semibold"
        >
          send a feedback
        </a>{" "}
        ✉️
      </span>
    </div>
  );
};

export default Footer;
