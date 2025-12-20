import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons/faVolumeXmark";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons/faVolumeHigh";

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      audioRef.current.muted = !isPlaying;
      audioRef.current.play();
    }
  };

  return (
    <>
      {/*
      Music by <a href="https://pixabay.com/users/paulyudin-27739282/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=449883">Pavel Bekirov</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=449883">Pixabay</a>
      */}
      <button id="audio-icon" onClick={togglePlay}>
        {isPlaying ? (
          <FontAwesomeIcon icon={faVolumeXmark} style={{ width: "18px" }} />
        ) : (
          <FontAwesomeIcon icon={faVolumeHigh} style={{ width: "18px" }} />
        )}
      </button>
      <audio autoPlay loop muted={!isPlaying} ref={audioRef} id="bg-audio">
        <source src={"/inspiring-music.mp3"} type="audio/mp3" />
      </audio>
    </>
  );
};

export default BackgroundAudio;
