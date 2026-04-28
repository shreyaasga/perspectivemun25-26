import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const RegisterSection = () => {
  return (
    <>
      <div className="section-divider" />
      <section id="register" className="py-24 lg:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-8"
          >
            Register Now
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-sm text-muted-foreground mb-16 max-w-2xl"
          >
            Registrations are now open for Perspective MUN. Secure your spot to shape global
            discourse and see the world from a new angle.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Delegate Registration", desc: "Individual delegates looking to represent a country in committee." },
              { title: "Delegation Registration", desc: "Register your school or university delegation as a group." },
              { title: "Accommodation Form", desc: "Outstation delegates can request accommodation assistance." },
            ].map((item, i) => (
              <div key={item.title} className="glow-border rounded-xl">
                <motion.a
                  href="#"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="modular-panel p-8 md:p-10 group hover:bg-primary/5 transition-all duration-500 block h-full rounded-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-0 bg-gradient-to-b from-primary via-rose to-warm-red group-hover:h-full transition-all duration-500 ease-out" />
                  <p className="font-display font-bold text-lg uppercase tracking-wider text-primary mb-4 group-hover:text-glow transition-all">
                    {item.title}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 group-hover:text-foreground/80 transition-colors">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-2 font-body text-xs text-primary uppercase tracking-widest mt-auto">
                    <span className="group-hover:tracking-[0.2em] transition-all duration-300">Apply</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterSection;
