import CircularArrowButton from "../components/CircularArrowButton";
import { useRef, useEffect, useState } from "react";
import { useNavigationStore } from "../store/useNavigation";

const RippleLines = () => {
  const [mounted, setMounted] = useState(false);
  const lineCount = 120;
  const lines = Array.from({ length: lineCount });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative w-0 h-0">
        {lines.map((_, i) => {
          const deg = i * (360 / lineCount);
          const delay = i % 2 === 0 ? i * 0.02 : i * 0.02 + 1.5;

          return (
            <span
              key={i}
              className="absolute left-1/2 w-[1.5px] bg-yellow-300 origin-bottom pointer-events-none"
              style={{
                height: "160px",
                bottom: "0px",
                left: "-0.75px",
                "--rotation": `${deg}deg`,
                animation: mounted
                  ? `kbcContinuousBurst 3s linear infinite`
                  : "none",
                animationDelay: `${delay}s`,
                boxShadow: "0 0 8px rgba(255,215,0,0.8)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const FirstInterface = () => {
  const goToPoster = useNavigationStore((state) => state.goToPoster);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-black">
      <audio ref={audioRef} src="/logos/intro.mp3" autoPlay preload="auto" />

      {/* Main Center Stage */}
      <div className="relative flex flex-col items-center justify-center w-full h-[80vh]">
        {/* Layer 1: The Ripple */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <RippleLines />
        </div>

        {/* Layer 2: The Rotating Logo */}
        <div
          className="relative flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <img
            src="/logos/image.png"
            alt="Steam Quiz Badge"
            className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] drop-shadow-[0_0_50px_rgba(30,58,138,0.6)]"
            style={{
              // 13s duration, ease-out makes it slow down smoothly at the end
              animation: "logoIntro 13s cubic-bezier(0.2, 0, 0.2, 1) forwards",
            }}
          />
        </div>
      </div>

      {/* Footer Area */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[20vh] pb-12 w-full">
        <div className="space-y-1 text-center text-white mb-6">
          <h1 className="text-2xl font-bold tracking-[0.2em] uppercase">
            STEAM Quiz Club
          </h1>
          <p className="text-sm text-blue-300 tracking-[0.3em] font-light italic">
            Think • Explore • Achieve
          </p>
        </div>
        <CircularArrowButton onClick={goToPoster} size={70} />
      </div>
      <style jsx global>{`
        @keyframes logoIntro {
          0% {
            /* Reduced rotation from -720 to -360 for a much slower spin */
            transform: scale(0.2) rotate(-360deg);
            opacity: 0;
          }
          /* Quick fade in so we can see the slow rotation clearly */
          15% {
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes kbcContinuousBurst {
          0% {
            transform: rotate(var(--rotation)) scaleY(0.01) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation)) scaleY(2.5) translateY(-350px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FirstInterface;
