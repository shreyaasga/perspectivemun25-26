import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Committees", path: "/committees" },
  { label: "Timeline", path: "/timeline" },
  { label: "FAQs", path: "/faqs" },
];

const TopNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/70 backdrop-blur-xl border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-2" : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display font-bold text-sm tracking-[0.25em] uppercase text-foreground hover:text-primary transition-colors">
          Perspective MUN
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`relative font-display font-semibold text-xs uppercase tracking-[0.2em] transition-colors py-2 group ${location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
                }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary glow-border"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <div className="glow-border">
            <Link
              to="/#register"
              className="font-display font-bold text-xs uppercase tracking-[0.15em] text-primary-foreground bg-primary px-5 py-2.5 hover:bg-white transition-colors duration-300 block"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-display font-bold text-xs uppercase tracking-widest text-primary hover:text-white transition-colors p-2"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5 border-t border-primary/10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`font-display font-bold text-base uppercase tracking-widest transition-colors ${location.pathname === item.path ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 glow-border self-start">
                <Link
                  to="/#register"
                  onClick={() => setOpen(false)}
                  className="font-display font-bold text-sm uppercase tracking-widest text-primary-foreground bg-primary px-6 py-3 block hover:bg-white transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNav;
