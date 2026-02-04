import { useNavigationStore } from "../store/useNavigation";

export const WelcomePage = () => {
  const { goToIntro } = useNavigationStore();

  return (
    <section className="relative w-screen h-screen overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/welcome.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">


        <button
          onClick={goToIntro}
          className="px-12 w-[400px] py-4 text-4xl font-bold mb-15 rounded-full bg-linear-to-b from-pink-500  to-sky-700 transition-all duration-300 shadow-lg hover:scale-105"
        >
          Let's Play
        </button>

      </div>

    </section>
  );
};
