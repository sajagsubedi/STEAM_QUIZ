import React from "react";
import { useNavigationStore } from "../../store/useNavigation";
import { QUESTIONS } from "../../constants/questions";
import { ROUND_CONFIGS } from "../../constants/roundConfig";
import { Database, Home } from "lucide-react"; // Added Home icon

const SubjectSelection = () => {
  const { currentRound, selectEliminationSubject, nextInRound, goToMenu } =
    useNavigationStore();

  const subjects = QUESTIONS[currentRound];
  const config = ROUND_CONFIGS[currentRound];

  if (!subjects) return null;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-black relative p-6 md:p-12">
      {/* BACKGROUND DECORATIVE GRID */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #4f46e5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* NAVIGATION BUTTONS */}
      <div className="absolute left-6 top-6 z-50">
        <button
          onClick={goToMenu}
          className="group flex items-center gap-2"
        >
          <div className="bg-white/5 p-3 rounded-full border border-white/10 group-hover:border-yellow-500 transition-all shadow-lg backdrop-blur-md">
            <Home className="text-white group-hover:text-yellow-400" size={20} />
          </div>
          <span className="text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
            Menu
          </span>
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="px-6 py-1.5 bg-linear-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full text-black text-[10px] font-black uppercase tracking-[0.3em] shadow-lg mb-3">
          {config.title}
        </div>

        <h2 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-4">
          <span className="w-10 h-[1px] bg-yellow-500/50" />
          {currentRound === "rapidFire" ? "Set Selection" : "Subject Selection"}
          <span className="w-10 h-[1px] bg-yellow-500/50" />
        </h2>
      </div>

      {/* SUBJECT GRID */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
          {subjects.slice(0, 4).map((subject, index) => (
            <button
              key={subject.subjectId}
              onClick={() => {
                selectEliminationSubject(subject.subjectId);
                nextInRound();
              }}
              className="group relative h-40 bg-purple-950/30 backdrop-blur-md border border-white/10 hover:border-yellow-500/80 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between text-left active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute top-2 right-6 text-yellow-500/5 font-black text-6xl group-hover:text-yellow-500/10 transition-all">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex items-start justify-between">
                <div className="p-2.5 bg-yellow-500 text-black rounded-xl shadow-md group-hover:shadow-yellow-500/20 transition-all">
                  <Database size={20} />
                </div>
                <div className="text-[9px] text-yellow-500/40 font-mono uppercase tracking-widest font-bold group-hover:text-yellow-500/80">
                  ID: NODE_0{index + 1}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors uppercase leading-none">
                  {subject.subjectName}
                </h3>
                <div className="w-8 h-[2px] bg-yellow-500 mt-2 group-hover:w-full transition-all duration-500" />
              </div>

              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-yellow-500 transition-all" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-yellow-500 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER METADATA */}
      <div className="relative z-10 flex justify-between items-center mt-6 pt-4 border-t border-white/5">
        <div className="text-[9px] text-white/30 font-mono tracking-widest uppercase font-medium">
          Terminal: <span className="text-yellow-500/50">Secure_Access</span>
        </div>
        <div className="text-[9px] text-white/30 font-mono tracking-widest uppercase font-medium">
          Status: <span className="text-green-500/50">Ready</span>
        </div>
      </div>
    </div>
  );
};

export { SubjectSelection };