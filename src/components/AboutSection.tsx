import { motion } from "framer-motion";
import { Users, CalendarDays, Landmark } from "lucide-react";

const AboutSection = () => {
  return (
    <>
      <div className="section-divider" />
      <section id="about" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-wider text-foreground mb-6 md:mb-8 heading-gradient leading-tight">
              Your Gateway to an Exceptional MUN Experience
            </h2>
            <div className="space-y-4 md:space-y-6 text-sm md:text-base lg:text-lg">
              <p className="font-body leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                At Perspective MUN, we bring together passionate delegates for a truly enriching Model United Nations experience. Through engaging committees and an accomplished Executive Board, diplomacy and dialogue thrive.
              </p>
              <p className="font-body leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                Delegates challenge ideas, collaborate on global issues, and strengthen leadership and critical thinking. Perspective MUN nurtures confidence, perspective, and the mindset of future global leaders.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative glow-border rounded-lg w-full max-w-3xl"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full z-0" />
            <img
              src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&q=80"
              alt="Conference delegates debating"
              className="w-full h-48 md:h-80 lg:h-96 object-cover relative z-10 rounded-lg filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 border border-primary/30 z-20 rounded-lg" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-6 mt-12 md:mt-20">
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
              whileHover={{ y: -10 }}
              className="modular-panel p-4 md:p-10 text-center rounded-xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-rose/5 to-warm-red/5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
              <div className="flex justify-center mb-3 md:mb-6">
                <stat.icon className="w-6 h-6 md:w-10 md:h-10 text-primary/60 group-hover:text-primary group-active:text-primary transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <p className="font-display font-extrabold text-2xl md:text-4xl lg:text-5xl text-primary text-glow relative z-10">
                {stat.number}
              </p>
              <p className="font-body text-[8px] md:text-xs uppercase tracking-widest text-muted-foreground mt-2 md:mt-4 relative z-10 group-hover:text-foreground group-active:text-foreground transition-colors">
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
