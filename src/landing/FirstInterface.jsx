

import ParticleExplosion from "./ParticleExplosion";
import CircularArrowButton from "../components/CircularArrowButton";
import { useRef, useEffect, useState } from "react";
import { useNavigationStore } from "../store/useNavigation";


export const FirstInterface = () => {
  const goToIntro = useNavigationStore((state) => state.goToIntro);
  const [triggerKey] = useState(() => Date.now());
  const [logoIn, setLogoIn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Animate logo pop-in after short delay
    const timer = setTimeout(() => setLogoIn(true), 400);
    // Play audio (if not blocked by browser)
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8">
      {/* KBC Intro Song */}
         <audio ref={audioRef} src="/logos/intro.mp3" autoPlay preload="auto" />
      <div className="flex flex-col items-center text-center text-white space-y-8 relative" style={{width: 420, height: 520}}>
        {/* Particle explosion overlays badge */}
        <ParticleExplosion triggerKey={triggerKey} />
        <img
          src="/logos/image.png"
          alt="Steam Quiz Badge"
          width={420}
          height={420}
          className={`drop-shadow-2xl object-contain transition-all duration-[1600ms] ease-[cubic-bezier(.22,1.2,.36,1)] ${logoIn ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'}`}
          style={{zIndex: 2, borderRadius: '50%', boxShadow: '0 0 32px 8px #ffd70099, 0 0 8px 2px #fffbe7'}}
        />

        <div className="space-y-2" style={{zIndex: 3}}>
          <p className="text-xl font-semibold">STEAM Quiz Club</p>
          <p className="text-sm text-gray-300">Think • Explore • Achieve</p>
        </div>

        <div style={{zIndex: 3, marginTop: 16, display: 'flex', justifyContent: 'center'}}>
          <CircularArrowButton onClick={goToIntro} size={70} />
        </div>
      </div>
    </div>
  );
};

export default FirstInterface;
