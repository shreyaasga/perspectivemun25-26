import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const RegisterSection = () => {
  return (
    <>
      <div className="section-divider" />
      <section id="register" className="py-32 lg:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-5xl md:text-6xl uppercase tracking-wider mb-6"
          >
            Register Now
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-lg text-foreground-muted mb-20 max-w-3xl"
          >
            Registrations are now open for Perspective MUN. Secure your spot to shape global
            discourse and see the world from a new angle.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Delegate Registration", desc: "Individual delegates looking to represent a country in committee." },
              { title: "Delegation Registration", desc: "Register your school or university delegation as a group." },
              { title: "Accommodation Form", desc: "Outstation delegates can request accommodation assistance." },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="card-premium p-10 group block relative overflow-hidden hover:border-accent-primary/40"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-accent-primary group-hover:h-full transition-all duration-500 ease-out" />
                <p className="font-display font-bold text-xl uppercase tracking-wider text-accent-primary mb-4 group-hover:text-glow transition-all relative z-10">
                  {item.title}
                </p>
                <p className="font-body text-base text-foreground-muted leading-relaxed mb-8 group-hover:text-foreground transition-colors relative z-10">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 font-body text-sm text-accent-primary uppercase tracking-widest mt-auto relative z-10">
                  <span className="group-hover:tracking-[0.3em] transition-all duration-300">Apply</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterSection;
