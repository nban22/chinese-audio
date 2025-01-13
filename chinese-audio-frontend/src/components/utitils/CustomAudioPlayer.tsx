import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState, useEffect } from "react";

interface CustomAudioPlayerProps {
  src: string;
  className?: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({
  src,
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Play/Pause Handler
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Update Time Handler
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Seek Handler
  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // Volume Handler
  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  // Format Time Helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      // Set Duration on Metadata Load
      const setAudioDuration = () => setDuration(audio.duration);

      audio.addEventListener("loadedmetadata", setAudioDuration);
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("loadedmetadata", setAudioDuration);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <div
      className={`audio-player rounded-lg bg-gray-900 p-4 text-white shadow-md ${className}`}
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={src} />

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none"
        >
          {isPlaying ? (
            <PlayIcon className="h-6 w-6" />
          ) : (
            <PauseIcon className="h-6 w-6" />
          )}
        </button>

        {/* Timeline Slider */}
        <input
          type="range"
          min="0"
          max={duration}
          step="1"
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="flex-1 cursor-pointer bg-gray-700"
        />

        {/* Current Time / Duration */}
        <span className="text-sm">{formatTime(currentTime)}</span>
        <span>/</span>
        <span className="text-sm">{formatTime(duration)}</span>

        {/* Volume Control */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="w-24 cursor-pointer bg-gray-700"
        />
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
