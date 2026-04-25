import { motion } from "framer-motion";
import { useRef } from "react";
// Pre-generate static random values for particles so they don't jump on re-renders
const generateParticles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // -50vw to 50vw
    y: Math.random() * 100 - 50, // -50vh to 50vh
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
};

const ambientParticles = generateParticles(40);
const convergingParticles = generateParticles(60);

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const perspectiveText = "PERSPECTIVE".split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden"
    >
      {/* Pink glow behind hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(225, 29, 72, 0.15), transparent 60%)",
          filter: "blur(80px)",
          zIndex: 0
        }}
      />

      {/* Background with Ambient Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Floating Ambient Particles */}
        {ambientParticles.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute top-1/2 left-1/2 rounded-full blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              background: "rgba(225, 29, 72, 0.4)"
            }}
            initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
            animate={{
              x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`, `${p.x}vw`],
              y: [`${p.y}vh`, `${p.y + (Math.random() * 10 - 5)}vh`, `${p.y}vh`],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          />
        ))}

        {/* Converging Intro Particles */}
        {convergingParticles.map((p) => (
          <motion.div
            key={`converging-${p.id}`}
            className="absolute top-1/2 left-1/2 rounded-full blur-[2px]"
            style={{
              width: p.size * 1.5,
              height: p.size * 1.5,
              background: "#E11D48",
              boxShadow: "0 0 10px rgba(225, 29, 72, 0.6)"
            }}
            initial={{ x: `${p.x * 2}vw`, y: `${p.y * 2}vh`, opacity: 0, scale: 0 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 2, delay: 0.2 + (p.delay * 0.2), ease: "circIn" }}
          />
        ))}
      </div>

      {/* Centered Content Container */}
      <div className="text-center relative z-10 flex flex-col items-center w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-body text-xs md:text-sm uppercase tracking-[0.4em] text-foreground-muted mb-8"
        >
          May 2026
        </motion.p>

        {/* Word Container */}
        <div className="relative group cursor-crosshair">
          <h1
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none flex justify-center flex-nowrap gap-x-1 sm:gap-x-2 md:gap-x-3 relative z-10"
          >
            {perspectiveText.map((char, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  transition: {
                    duration: 2.5,
                    delay: 0.5 + index * 0.08,
                    type: "spring",
                    bounce: 0.2,
                  }
                }}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-hover to-accent-primary bg-[length:200%_auto] animate-gradient"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 1.5,
            }}
            className="font-display font-bold uppercase tracking-[0.4em] inline-block bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-hover to-accent-primary bg-[length:200%_auto] animate-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-6 relative text-center"
          >
            MUN
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="font-body text-foreground-muted text-base md:text-lg mt-12 max-w-2xl mx-auto leading-relaxed px-4 text-center"
        >
          A student-led conference that shapes your perspective.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-14 w-full sm:w-auto"
        >
          <a
            href="#register"
            className="w-full sm:w-auto relative group flex items-center justify-center btn-primary"
          >
            Register Now
          </a>
          <a
            href="#about"
            className="font-body text-sm uppercase tracking-widest text-accent-primary border-b-2 border-accent-primary/40 pb-1 hover:border-accent-primary transition-all duration-300 hover:text-accent-hover w-full sm:w-auto text-center"
          >
            Learn More
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;