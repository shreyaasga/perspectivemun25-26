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
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden bg-background"
    >


      {/* Background with Ambient Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-rose/3 to-background/90" />
        <div className="absolute top-0 left-1/4 w-[60%] h-[40%] bg-rose-pink/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[30%] bg-warm-red/4 blur-[100px] rounded-full" />

        {/* Floating Ambient Particles */}
        {ambientParticles.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute top-1/2 left-1/2 rounded-full bg-primary/40 blur-[1px]"
            style={{ width: p.size, height: p.size }}
            initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
            animate={{
              x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`, `${p.x}vw`],
              y: [`${p.y}vh`, `${p.y + (Math.random() * 10 - 5)}vh`, `${p.y}vh`],
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          />
        ))}

        {/* Converging Intro Particles */}
        {convergingParticles.map((p) => (
          <motion.div
            key={`converging-${p.id}`}
            className="absolute top-1/2 left-1/2 rounded-full bg-primary blur-[2px] shadow-[0_0_10px_hsl(var(--primary)),0_0_20px_hsl(var(--rose-pink)/0.3)]"
            style={{ width: p.size * 1.5, height: p.size * 1.5 }}
            initial={{ x: `${p.x * 2}vw`, y: `${p.y * 2}vh`, opacity: 0, scale: 0 }}
            animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 2, delay: 0.2 + (p.delay * 0.2), ease: "circIn" }}
          />
        ))}

        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
      </div>

      {/* Centered Content Container */}
      <div className="text-center relative z-10 flex flex-col items-center w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-body text-sm md:text-base uppercase tracking-[0.4em] text-foreground/90 mb-6"
        >
          August 2026
        </motion.p>

        {/* Word Container */}
        <div className="relative group cursor-crosshair">
          <h1
            className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none flex justify-center flex-nowrap gap-x-0.5 sm:gap-x-1 md:gap-x-2 relative z-10"
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
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-rose to-warm-red bg-[length:200%_auto] animate-gradient"
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
            className="font-display font-bold uppercase tracking-[0.3em] inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-rose to-warm-red bg-[length:200%_auto] animate-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 md:tracking-[0.5em] relative text-center"
          >
            MUN
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="font-body text-foreground/90 text-base md:text-lg mt-10 max-w-lg mx-auto leading-relaxed px-4 text-center"
        >
          A student led conference that shapes your perspective.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 w-full sm:w-auto"
        >
          <a
            href="#register"
            className="glow-border w-full sm:w-auto relative group flex items-center justify-center"
          >
            <span className="font-display font-bold text-xs uppercase tracking-[0.15em] text-primary-foreground bg-primary px-8 py-4 w-full h-full hover:bg-white transition-colors duration-300">
              Register Now
            </span>
          </a>
          <a
            href="#about"
            className="font-body text-xs uppercase tracking-widest text-primary border-b border-primary/40 pb-1 hover:border-primary transition-colors hover:text-white duration-300 w-full sm:w-auto mt-4 sm:mt-0"
          >
            Learn More
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;