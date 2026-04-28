import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import TopNav from "@/components/TopNav";

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

const CommitteesPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotationOffset, setRotationOffset] = useState<number>(0);
  const [radius, setRadius] = useState<number>(280);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Calculate a safe padding for the center box (160px half-width) + node size (50px half-width) + gap (30px)
      // Maximum radius allowed by screen height constraints = (h - 220) / 2
      const maxRadiusByHeight = Math.max(145, (h - 220) / 2);

      let newRadius;
      if (w < 768) newRadius = Math.min((w - 120) / 2, 160); // Constrain radius based on narrow screen width too
      else if (w < 1024) newRadius = 240;
      else newRadius = 320;

      setRadius(Math.min(newRadius, maxRadiusByHeight));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      changeCommittee(-1);
    } else if (info.offset.x < -swipeThreshold) {
      changeCommittee(1);
    }
  };

  const changeCommittee = (direction: number) => {
    setActiveIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = committees.length - 1;
      if (next >= committees.length) next = 0;
      return next;
    });
    setRotationOffset((prev) => prev - direction * (360 / committees.length));
  };

  const getDifficultyColor = (diff: string) => {
    if (diff.includes("Beginner")) return "bg-green-500";
    if (diff.includes("Advanced")) return "bg-destructive";
    if (diff.includes("Intermediate")) return "bg-yellow-500";
    return "bg-primary";
  };

  const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const words = text.split(" ");
    let charCount = 0;

    return (
      <span className="inline-block break-words">
        {words.map((word, wordIndex) => {
          const content = word.split("").map((char, charIndex) => {
            const currentDelay = delay + (charCount++) * 0.02;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: currentDelay }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          });

          // advance one for the space
          charCount++;

          return (
            <span key={wordIndex} className="inline-flex whitespace-nowrap">
              {content}
              {wordIndex < words.length - 1 && <span className="inline-block w-[0.25em]">&nbsp;</span>}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-8 px-4 md:px-6 min-h-[100dvh] flex flex-col justify-start overflow-hidden">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center">

          {/* Header */}
          <div className="mb-2 md:mb-6 shrink-0 w-full text-center">
            <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-wider text-foreground mb-2 md:mb-3 text-glow">
              <TypewriterText text="Committees" delay={0.2} />
            </h1>
            <p className="font-body text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed px-4">
              <TypewriterText text="Choose your arena. Each committee offers a unique challenge." delay={0.6} />
            </p>
          </div>

          {/* Mission Selection Wheel */}
          <div
            className="relative w-full mx-auto flex items-center justify-center shrink-0 transition-all duration-300"
            style={{ height: `${radius * 2 + 120}px` }}
            ref={containerRef}
          >

            {/* Center Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] max-w-[300px] max-h-[300px] bg-primary/20 blur-[80px] rounded-full z-0 pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[30%] h-[30%] bg-rose/10 blur-[60px] rounded-full z-0 pointer-events-none" />
            <div className="absolute bottom-1/3 left-1/4 w-[25%] h-[25%] bg-warm-red/8 blur-[50px] rounded-full z-0 pointer-events-none" />

            {/* Orbiting Committees */}
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotate: rotationOffset }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {committees.map((c, i) => {
                const total = committees.length;
                const angle = (i * (360 / total));

                // Calculate position on the circle
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const y = -Math.cos((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={c.abbr}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      x,
                      y,
                      rotate: -rotationOffset // Counter-rotate so text stays upright
                    }}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <motion.button
                        onClick={() => {
                          const diff = i - activeIndex;
                          changeCommittee(diff);
                        }}
                        className={`relative flex flex-col items-center justify-center w-[56px] h-[56px] md:w-[96px] md:h-[96px] rounded-full modular-panel cursor-pointer group transition-all duration-500 border-2 ${activeIndex === i ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_15px_hsl(var(--rose-pink)/0.3)] scale-110 z-20' : 'border-white/10 hover:border-primary/50 opacity-60 hover:opacity-100 z-10'}`}
                        whileHover={{ scale: activeIndex === i ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className={`font-display font-bold text-[9px] md:text-sm tracking-wider transition-all duration-300 ${activeIndex === i ? 'text-primary text-glow' : 'text-muted-foreground group-hover:text-primary group-hover:text-glow'}`}>
                          {c.abbr}
                        </span>
                        {activeIndex === i && (
                          <div className="absolute -bottom-1 flex h-1.5 w-1.5 md:-bottom-2 md:mt-1">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDifficultyColor(c.difficulty)}`}></span>
                            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getDifficultyColor(c.difficulty)}`}></span>
                          </div>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center Active Details - Scaled Down intentionally to guarantee a gap */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 w-[70%] max-w-[170px] md:w-[85%] md:max-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="modular-panel p-3 md:p-6 rounded-2xl text-center border border-primary/30 shadow-2xl bg-background/90 backdrop-blur-md pointer-events-auto flex flex-col justify-center items-center aspect-[4/3] md:aspect-auto holo-scanlines"
                >
                  <h2 className="font-display font-bold text-base md:text-lg text-foreground mb-2 text-glow leading-snug">
                    {committees[activeIndex].name}
                  </h2>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="relative flex h-1.5 w-1.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDifficultyColor(committees[activeIndex].difficulty)}`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getDifficultyColor(committees[activeIndex].difficulty)}`}></span>
                    </div>
                    <span className="font-body text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-widest">
                      {committees[activeIndex].difficulty}
                    </span>
                  </div>

                  <div className="h-px w-full max-w-[200px] mb-3 bg-primary/20" />

                  <p className="font-body text-[10px] uppercase tracking-widest text-primary mb-2">Agenda</p>
                  <p className="font-body text-xs md:text-sm text-foreground/90 leading-relaxed min-h-[60px] md:min-h-[80px]">
                    <TypewriterText text={committees[activeIndex].topic} delay={0.2} />
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev/Next Navigation Hints for Desktop */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 md:gap-12 pointer-events-auto text-muted-foreground text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-body opacity-50 z-40 w-full">
              <button onClick={() => changeCommittee(-1)} className="hover:text-primary transition-colors hover:text-glow px-4 py-2 border border-white/10 rounded-full md:border-transparent">← Prev</button>
              <button onClick={() => changeCommittee(1)} className="hover:text-primary transition-colors hover:text-glow px-4 py-2 border border-white/10 rounded-full md:border-transparent">Next →</button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default CommitteesPage;
