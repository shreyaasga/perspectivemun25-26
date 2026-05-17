import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
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

// Device breakpoints for sizing
type DeviceSize = {
  nodeSize: number;       // diameter of orbiting circle buttons
  centerWidth: number;    // width of center detail box
  centerHeight: number;   // height of center detail box
  gap: number;            // minimum gap between center box edge and node edge
  maxRadius: number;      // cap on radius
};

const deviceSizes: Record<string, DeviceSize> = {
  small:  { nodeSize: 44, centerWidth: 130, centerHeight: 160, gap: 80, maxRadius: 200 },
  medium: { nodeSize: 56, centerWidth: 160, centerHeight: 200, gap: 100, maxRadius: 240 },
  tablet: { nodeSize: 80, centerWidth: 260, centerHeight: 260, gap: 120, maxRadius: 320 },
  laptop: { nodeSize: 96, centerWidth: 320, centerHeight: 280, gap: 140, maxRadius: 380 },
  desktop:{ nodeSize: 96, centerWidth: 340, centerHeight: 300, gap: 160, maxRadius: 420 },
};

const getDeviceConfig = (w: number, h: number): DeviceSize => {
  if (w < 400) return deviceSizes.small;
  if (w < 768) return deviceSizes.medium;
  if (w < 1024) return deviceSizes.tablet;
  if (w < 1280) return deviceSizes.laptop;
  return deviceSizes.desktop;
};

const CommitteesPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotationOffset, setRotationOffset] = useState<number>(0);
  const [config, setConfig] = useState<DeviceSize>(deviceSizes.laptop);
  const [radius, setRadius] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cfg = getDeviceConfig(w, h);

      // Radius must be: (centerBox/2) + gap + (node/2)
      const minRadius = Math.max(cfg.centerWidth, cfg.centerHeight) / 2 + cfg.gap + cfg.nodeSize / 2;
      const maxByScreen = Math.min((w - 40) / 2, (h - 280) / 2);
      const finalRadius = Math.min(Math.max(minRadius, 100), cfg.maxRadius, maxByScreen);

      setConfig(cfg);
      setRadius(finalRadius);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeCommittee = useCallback((direction: number) => {
    setActiveIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = committees.length - 1;
      if (next >= committees.length) next = 0;
      return next;
    });
    setRotationOffset((prev) => prev - direction * (360 / committees.length));
  }, []);

  const handleDragEnd = useCallback((_: any, info: any) => {
    if (isDragging.current) return;
    isDragging.current = true;
    const swipeThreshold = 40;
    if (info.offset.x > swipeThreshold) {
      changeCommittee(-1);
    } else if (info.offset.x < -swipeThreshold) {
      changeCommittee(1);
    }
    setTimeout(() => { isDragging.current = false; }, 400);
  }, [changeCommittee]);

  const getDifficultyColor = (diff: string) => {
    if (diff.includes("Beginner")) return "bg-green-500";
    if (diff.includes("Advanced")) return "bg-destructive";
    if (diff.includes("Intermediate")) return "bg-yellow-500";
    return "bg-primary";
  };

  const total = committees.length;
  const angleStep = 360 / total;
  const nodePx = config.nodeSize;
  const centerWPx = config.centerWidth;
  const centerHPx = config.centerHeight;

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-[100dvh] flex flex-col justify-start overflow-hidden">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 md:mb-8 shrink-0 w-full text-center"
          >
            <h1 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-wider text-foreground mb-2 md:mb-3 text-glow">
              Committees
            </h1>
            <p className="font-body text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed px-4">
              Choose your arena. Each committee offers a unique challenge.
            </p>
          </motion.div>

          {/* Orbital Wheel */}
          <div
            className="relative w-full mx-auto flex items-center justify-center shrink-0"
            style={{ height: `${radius * 2 + nodePx + 40}px` }}
            ref={containerRef}
          >
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] max-w-[300px] max-h-[300px] bg-primary/20 blur-[80px] rounded-full z-0 pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[30%] h-[30%] bg-rose/10 blur-[60px] rounded-full z-0 pointer-events-none" />

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
                const angle = i * angleStep;
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const y = -Math.cos((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={c.abbr}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      x,
                      y,
                      rotate: -rotationOffset,
                    }}
                  >
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <motion.button
                        onClick={() => {
                          const diff = i - activeIndex;
                          if (diff !== 0) changeCommittee(diff);
                        }}
                        style={{ width: nodePx, height: nodePx }}
                        className={`relative flex flex-col items-center justify-center rounded-full modular-panel cursor-pointer group transition-all duration-500 border-2 ${
                          activeIndex === i
                            ? 'border-primary shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_15px_hsl(var(--rose-pink)/0.3)] scale-110 z-20'
                            : 'border-white/10 hover:border-primary/50 opacity-60 hover:opacity-100 z-10'
                        }`}
                        whileHover={{ scale: activeIndex === i ? 1.1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className={`font-display font-bold tracking-wider transition-all duration-300 ${
                          nodePx < 60 ? 'text-[7px]' : nodePx < 90 ? 'text-[10px]' : 'text-sm'
                        } ${
                          activeIndex === i ? 'text-primary text-glow' : 'text-muted-foreground group-hover:text-primary group-hover:text-glow'
                        }`}>
                          {c.abbr}
                        </span>
                        {activeIndex === i && (
                          <div className="absolute flex h-1.5 w-1.5" style={{ bottom: nodePx < 60 ? -4 : -8 }}>
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

            {/* Center Active Details */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              style={{ width: centerWPx, maxWidth: centerWPx }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="modular-panel p-3 md:p-6 rounded-2xl text-center border border-primary/30 shadow-2xl bg-background/90 backdrop-blur-md pointer-events-auto flex flex-col justify-center items-center holo-scanlines"
                  style={{ minHeight: centerHPx }}
                >
                  <h2 className={`font-display font-bold text-foreground mb-2 text-glow leading-snug ${
                    centerWPx < 160 ? 'text-[10px]' : centerWPx < 280 ? 'text-sm' : 'text-lg'
                  }`}>
                    {committees[activeIndex].name}
                  </h2>

                  <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                    <div className="relative flex h-1.5 w-1.5">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDifficultyColor(committees[activeIndex].difficulty)}`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getDifficultyColor(committees[activeIndex].difficulty)}`}></span>
                    </div>
                    <span className={`font-body text-muted-foreground uppercase tracking-widest ${
                      centerWPx < 160 ? 'text-[7px]' : centerWPx < 280 ? 'text-[9px]' : 'text-[11px]'
                    }`}>
                      {committees[activeIndex].difficulty}
                    </span>
                  </div>

                  <div className="h-px w-full max-w-[200px] mb-2 md:mb-3 bg-primary/20" />

                  <p className={`font-body uppercase tracking-widest text-primary mb-1 md:mb-2 ${
                    centerWPx < 160 ? 'text-[7px]' : centerWPx < 280 ? 'text-[8px]' : 'text-[11px]'
                  }`}>Agenda</p>
                  <p className={`font-body text-foreground/90 leading-relaxed ${
                    centerWPx < 160 ? 'text-[8px]' : centerWPx < 280 ? 'text-[10px]' : 'text-sm'
                  }`}>
                    {committees[activeIndex].topic}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev/Next Navigation */}
            <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 md:gap-12 pointer-events-auto text-muted-foreground text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-body opacity-50 z-40 w-full">
              <button onClick={() => changeCommittee(-1)} className="hover:text-primary transition-colors hover:text-glow px-3 py-1.5 border border-white/10 rounded-full md:border-transparent">Prev</button>
              <span className="text-[9px]">{activeIndex + 1}/{total}</span>
              <button onClick={() => changeCommittee(1)} className="hover:text-primary transition-colors hover:text-glow px-3 py-1.5 border border-white/10 rounded-full md:border-transparent">Next</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommitteesPage;
