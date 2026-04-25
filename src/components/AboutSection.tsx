import { motion } from "framer-motion";
import { Users, CalendarDays, Landmark } from "lucide-react";

const AboutSection = () => {
  return (
    <>
      <div className="section-divider" />
      <section id="about" className="py-32 lg:py-40 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider mb-8 leading-tight">
              Your Gateway to an Exceptional MUN Experience
            </h2>
            <div className="space-y-6 text-lg md:text-xl">
              <p className="font-body leading-relaxed text-foreground-muted max-w-3xl mx-auto">
                At Perspective MUN, we bring together passionate delegates for a truly enriching Model United Nations experience. Through engaging committees and an accomplished Executive Board, diplomacy and dialogue thrive.
              </p>
              <p className="font-body leading-relaxed text-foreground-muted max-w-3xl mx-auto">
                Delegates challenge ideas, collaborate on global issues, and strengthen leadership and critical thinking. Perspective MUN nurtures confidence, perspective, and the mindset of future global leaders.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-4xl"
          >
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(225, 29, 72, 0.2), transparent)",
                filter: "blur(40px)",
                zIndex: 0
              }}
            />
            <img
              src="https://images.pexels.com/photos/3808219/pexels-photo-3808219.jpeg?w=1200&q=80"
              alt="Conference delegates debating"
              className="w-full h-96 md:h-[500px] object-cover relative z-10 rounded-xl border border-accent-primary/20 filter grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { number: "06", label: "Committees", icon: Landmark },
            { number: "150+", label: "Delegates Expected", icon: Users },
            { number: "02", label: "Days of Debate", icon: CalendarDays },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="card-premium text-center relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="flex justify-center mb-6 relative z-10">
                <stat.icon className="w-12 h-12 text-accent-primary/50 group-hover:text-accent-primary transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <p className="font-display font-extrabold text-5xl md:text-6xl text-accent-primary text-glow relative z-10">
                {stat.number}
              </p>
              <p className="font-body text-sm uppercase tracking-widest text-foreground-muted mt-4 relative z-10 group-hover:text-foreground transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSection;
