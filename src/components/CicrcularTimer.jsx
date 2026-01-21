import { useEffect, useRef, useState } from "react";

export default function CircularMultiTimer({ timers = [] ,nextFunction}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerCompleted, setTimerCompleted]=useState(false)

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  /* ---------------- Start Next Timer ---------------- */
  const handleNextTimer = () => {
    const nextIndex = currentIndex + 1;
    if (!timers[nextIndex] ) {
      console.log(nextFunction)
      if(!nextFunction){
        setTimerCompleted(true)
        setIsRunning(false);
        setCurrentIndex(-1);
        setTimeLeft(0);
        stopAudio();
        return;
      }
      nextFunction();
      return;
    }
    if(timerCompleted) return

    clearInterval(intervalRef.current);

    const nextDuration = timers[nextIndex];

    setCurrentIndex(nextIndex);
    setTimeLeft(nextDuration);
    setIsRunning(true);

    playAudioFrom(61 - nextDuration);
  };

  /* ---------------- Audio Control ---------------- */
  const playAudioFrom = (startTime) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = Math.max(0, startTime);
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  /* ---------------- Keyboard Handler ---------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleNextTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isRunning, handleNextTimer]);

  /* ---------------- Timer Logic ---------------- */
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleNextTimer();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, handleNextTimer]);

  /* ---------------- SVG Progress ---------------- */
  const progress = currentIndex === -1 ? 0 : timeLeft / timers[currentIndex];

  const dashOffset = circumference - progress * circumference;

  return (
    <>
      <audio ref={audioRef} src="/ticksound.mp3" preload="auto" />

      <div className="fixed bottom-4 left-4 z-50">
        <div className="relative w-[140px] h-[140px] bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg width={size} height={size} className="absolute rotate-[-90deg]">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#4f46e5"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{timeLeft}s</div>
            <div className="text-xs text-gray-500">
              {currentIndex === -1
                ? "Press Enter"
                : `Timer ${currentIndex + 1}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
