import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin } from "lucide-react";

const ContactSection = () => {
  return (
    <>
      <div className="section-divider" />
      <section id="contact" className="py-16 md:py-24 lg:py-32 px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-8 md:mb-12">
              Contact
            </h2>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> General Inquiries
            </p>
            <a href="mailto:contact@perspectivemun.com" className="font-body text-sm text-foreground hover:text-primary transition-colors text-glow break-all">
              contact@perspectivemun.com
            </a>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4 mt-8 md:mt-12 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-primary" /> Follow Us
            </p>
            <div className="flex flex-col gap-3">
              <a href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative glow-border rounded-lg mb-6 md:mb-8">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                alt="Conference venue"
                className="w-full h-40 md:h-64 object-cover rounded-lg filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 border border-primary/20 rounded-lg pointer-events-none" />
            </div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Venue
            </p>
            <p className="font-body text-sm text-foreground">To Be Announced</p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider opacity-50" />
      <footer className="py-8 md:py-12 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-3xl z-0" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative z-10 modular-panel p-4 md:p-6 rounded-2xl">
          <p className="font-display font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-primary text-glow">
            Perspective MUN © 2026
          </p>
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-primary/50 hidden md:block" />
            <p className="font-body text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
              See the world differently.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactSection;
