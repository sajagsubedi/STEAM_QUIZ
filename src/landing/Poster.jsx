import CircularArrowButton from "../components/CircularArrowButton";
import { useNavigationStore } from "../store/useNavigation";

export const PosterPage = () => {
  const goToRules = useNavigationStore((state) => state.goToRules);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'url(/logos/posterbg.jpg) center/cover, #181818',
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Neon border with glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          borderRadius: '32px',
          border: '8px solid transparent',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          boxShadow: '0 0 32px 8px #00eaff, 0 0 48px 16px #ff00ea, 0 0 0 8px #181818 inset',
        }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
          <rect x="0" y="0" width="100%" height="100%" rx="32" fill="none" stroke="url(#neon)" strokeWidth="8" />
          <defs>
            <linearGradient id="neon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00eaff" />
              <stop offset="50%" stopColor="#ff00ea" />
              <stop offset="100%" stopColor="#00eaff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Glowing particles and lightning effects */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(0, 234, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 0, 234, 0.3) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, #00eaff, transparent)', transform: 'rotate(30deg)' }} />
        <div style={{ position: 'absolute', top: '60%', right: '15%', width: '150px', height: '2px', background: 'linear-gradient(90deg, transparent, #ff00ea, transparent)', transform: 'rotate(-45deg)' }} />
      </div>

      {/* Content container */}
      <div
        className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto"
        style={{ zIndex: 2, padding: '2.5rem 1rem' }}
      >
        {/* School logo */}
        <img
          src="/logos/school-logo.png"
          alt="School Logo"
          style={{
            position: 'fixed',
            left: 32,
            top: 32,
            width: 180,
            height: 180,
            borderRadius: '50%',
            boxShadow: '0 0 32px 8px #00eaff, 0 0 24px 4px #ff00ea',
            border: '2.5px dashed #00eaff',
            objectFit: 'contain',
            zIndex: 10,
          }}
        />

        {/* Glowing title pill */}
        <div
          style={{
            marginTop: 0,
            marginBottom: 24,
            background: 'linear-gradient(90deg, #7c3aed, #00eaff)',
            color: 'white',
            borderRadius: 32,
            padding: '0.7rem 2.2rem',
            fontWeight: 700,
            fontSize: '1.5rem',
            boxShadow: '0 0 24px 8px rgba(124, 58, 237, 0.5), 0 0 32px 12px rgba(0, 234, 255, 0.3)',
            display: 'inline-block',
            textAlign: 'center',
            backgroundImage: 'url(/logos/titlepill.jpg)',
            backgroundSize: 'cover',
          }}
        >
          Science And Math Quiz<br />STEAM Club of SOS, Gandaki
        </div>

        {/* Quiz contest image */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <img
            src="/logos/quiz-contest.png"
            alt="Quiz Contest"
            style={{
              width: 340,
              height: 340,
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#444',
              color: '#ffd700',
              fontWeight: 900,
              fontSize: '1.3rem',
              borderRadius: 8,
              padding: '0.2rem 1.5rem',
              border: '2.5px solid #ffd700',
              boxShadow: '0 0 24px 8px rgba(255, 215, 0, 0.5)',
              minWidth: 180,
              textAlign: 'center',
            }}
          >
            2082 B.S.
          </div>
        </div>

        {/* Grade badge */}
        <div
          style={{
            background: 'linear-gradient(90deg, #22d3ee 0%, #16a34a 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.2rem',
            borderRadius: 24,
            padding: '0.5rem 2.2rem',
            marginBottom: 32,
            boxShadow: '0 0 24px 8px rgba(34, 211, 238, 0.5), 0 0 16px 4px rgba(22, 163, 74, 0.5)',
            display: 'inline-block',
          }}
        >
          Grade : XI & XII
        </div>

        {/* Start button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <CircularArrowButton onClick={goToRules} size={70} />
        </div>
      </div>
    </div>
  );
};
