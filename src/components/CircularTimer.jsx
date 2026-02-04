import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";

const CircularMultiTimer = forwardRef(({
  timers = [],
  nextFunction,
  paused = false,
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const size = 150;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const playAudioFrom = useCallback((startTime) => {
    if (!audioRef.current || paused) return;
    audioRef.current.currentTime = Math.max(0, startTime);
    // Use a promise to catch play errors
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => { /* Silent fail if browser blocks */ });
    }
  }, [paused]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const handleNextTimer = useCallback((force = false) => {
    // If paused, we only proceed if 'force' is true (from the Dismiss button)
    if (timerCompleted || (paused && !force)) return;

    const nextIndex = currentIndex + 1;

    if (!timers[nextIndex]) {
      if (nextFunction) {
        nextFunction();
      } else {
        setTimerCompleted(true);
        setIsRunning(false);
        setCurrentIndex(-1);
        setTimeLeft(0);
        stopAudio();
      }
      return;
    }

    clearInterval(intervalRef.current);
    const nextDuration = timers[nextIndex];

    setCurrentIndex(nextIndex);
    setTimeLeft(nextDuration);
    setIsRunning(true);
    playAudioFrom(61 - nextDuration);
  }, [currentIndex, nextFunction, timerCompleted, timers, paused, playAudioFrom, stopAudio]);

  // EXPOSE TO PARENT
  useImperativeHandle(ref, () => ({
    startNext: () => {
      // Force start even if the 'paused' prop is still true (during dialog close)
      handleNextTimer(true);
    }
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") handleNextTimer();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextTimer]);

  useEffect(() => {
    if (!isRunning || paused) {
      stopAudio();
      clearInterval(intervalRef.current);
      return;
    }

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
  }, [isRunning, handleNextTimer, paused, stopAudio]);

  const currentTotal = timers[currentIndex] || 1;
  const progress = currentIndex === -1 ? 0 : timeLeft / currentTotal;
  const dashOffset = circumference - progress * circumference;

  return (
    <>
      <audio ref={audioRef} src="/ticksound.mp3" preload="auto" loop />
      <div className="fixed bottom-6 left-6 z-50">
        <div className={`relative rounded-full flex items-center justify-center transition-all duration-500 ${paused ? "opacity-50 scale-95 grayscale" : ""}`} style={{ width: size, height: size }}>
          <svg width={size} height={size} className="absolute rotate-[-90deg]">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255, 255, 255, 0.05)" strokeWidth={strokeWidth} fill="transparent" />
            <circle cx={size / 2} cy={size / 2} r={radius} stroke={paused ? "#94a3b8" : "#fbbf24"} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" className="transition-all duration-1000 ease-linear" />
          </svg>
          <div className="text-center">
            <div className="text-4xl font-black text-white font-mono">{timeLeft}s</div>
            <div className="text-[10px] font-bold uppercase text-yellow-500">{paused ? "Paused" : currentIndex === -1 ? "Wait" : `Stage ${currentIndex + 1}`}</div>
          </div>
        </div>
      </div>
    </>
  );
});

export default CircularMultiTimer;