import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TopNav from "@/components/TopNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

const committees = [
  {
    name: "United Nations Security Council",
    abbr: "UNSC",
    topic: "Addressing the Escalation of Conflicts in the Horn of Africa",
    difficulty: "Advanced",
  },
  {
    name: "United Nations Human Rights Council",
    abbr: "UNHRC",
    topic: "Protecting Digital Privacy Rights in the Age of Surveillance",
    difficulty: "Intermediate",
  },
  {
    name: "Disarmament and International Security",
    abbr: "DISEC",
    topic: "Regulating Autonomous Weapons Systems Under International Law",
    difficulty: "Intermediate",
  },
  {
    name: "United Nations Environment Programme",
    abbr: "UNEP",
    topic: "Climate Migration and the Rights of Displaced Communities",
    difficulty: "Beginner",
  },
  {
    name: "All India Political Parties Meet",
    abbr: "AIPPM",
    topic: "Deliberating the Uniform Civil Code",
    difficulty: "Advanced",
  },
  {
    name: "International Press Corps",
    abbr: "IPC",
    topic: "Reporting Across All Committees",
    difficulty: "All Levels",
  },
];

const getDifficultyColor = (diff: string) => {
  if (diff.includes("Beginner")) return "bg-green-500";
  if (diff.includes("Advanced")) return "bg-destructive";
  if (diff.includes("Intermediate")) return "bg-yellow-500";
  return "bg-primary";
};

const CommitteesPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const changeCommittee = (direction: number) => {
    setActiveIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = committees.length - 1;
      if (next >= committees.length) next = 0;
      return next;
    });
  };

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-24 px-4 md:px-6 min-h-[100dvh] flex flex-col items-center">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12 shrink-0 w-full text-center"
          >
            <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-wider text-foreground mb-2 md:mb-3 text-glow">
              Committees
            </h1>
            <p className="font-body text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed px-4">
              Choose your arena. Each committee offers a unique challenge.
            </p>
          </motion.div>

          {/* Committee Selector Tabs */}
          <div className="w-full flex flex-wrap gap-2 justify-center mb-8 md:mb-12">
            {committees.map((c, i) => (
              <button
                key={c.abbr}
                onClick={() => setActiveIndex(i)}
                className={`relative px-3 py-1.5 md:px-4 md:py-2 rounded-full font-display text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeIndex === i
                    ? "border-primary bg-primary/10 text-primary text-glow shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                    : "border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30 bg-white/5"
                }`}
              >
                <span className="relative z-10">{c.abbr}</span>
              </button>
            ))}
          </div>

          {/* Active Committee Detail Card */}
          <div className="w-full max-w-2xl relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/15 blur-[100px] rounded-full z-0 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="modular-panel p-6 md:p-10 rounded-2xl border border-primary/30 shadow-2xl bg-background/90 backdrop-blur-md relative z-10 holo-scanlines"
              >
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDifficultyColor(committees[activeIndex].difficulty)}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${getDifficultyColor(committees[activeIndex].difficulty)}`}></span>
                    </div>
                    <span className="font-body text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                      {committees[activeIndex].difficulty}
                    </span>
                  </div>
                  <span className="font-display font-bold text-xs md:text-sm text-primary uppercase tracking-widest text-glow">
                    {committees[activeIndex].abbr}
                  </span>
                </div>

                {/* Committee Name */}
                <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-foreground mb-6 text-glow leading-tight">
                  {committees[activeIndex].name}
                </h2>

                <div className="h-px w-full bg-primary/20 mb-6" />

                {/* Agenda */}
                <p className="font-body text-[10px] md:text-xs uppercase tracking-widest text-primary mb-3">Agenda</p>
                <p className="font-body text-sm md:text-base text-foreground/90 leading-relaxed">
                  {committees[activeIndex].topic}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <button
                onClick={() => changeCommittee(-1)}
                className="flex items-center gap-2 font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors hover:text-glow px-4 py-2 border border-white/10 rounded-full hover:border-primary/30"
              >
                <ChevronLeft className="w-3 h-3" />
                Prev
              </button>
              <span className="font-body text-[10px] text-muted-foreground/50">
                {activeIndex + 1} / {committees.length}
              </span>
              <button
                onClick={() => changeCommittee(1)}
                className="flex items-center gap-2 font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors hover:text-glow px-4 py-2 border border-white/10 rounded-full hover:border-primary/30"
              >
                Next
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* All Committees Grid */}
          <div className="w-full mt-12 md:mt-16">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {committees.map((c, i) => (
                <motion.button
                  key={c.abbr}
                  onClick={() => setActiveIndex(i)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`modular-panel p-4 md:p-5 rounded-xl text-left transition-all duration-300 border cursor-pointer ${
                    activeIndex === i
                      ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                      : "border-white/5 hover:border-primary/20 hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${getDifficultyColor(c.difficulty)}`} />
                    <span className="font-display font-bold text-[9px] md:text-[10px] text-primary uppercase tracking-widest">
                      {c.abbr}
                    </span>
                  </div>
                  <p className="font-body text-[10px] md:text-xs text-foreground/70 leading-relaxed line-clamp-2">
                    {c.topic}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommitteesPage;
