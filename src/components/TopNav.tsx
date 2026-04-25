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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl border-b border-accent-primary/10 shadow-lg" : "bg-transparent"
        }`}
      style={scrolled ? { background: "rgba(10, 10, 15, 0.6)" } : {}}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display font-bold text-sm tracking-[0.25em] uppercase text-foreground hover:text-accent-primary transition-colors duration-300">
          Perspective MUN
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`relative font-display font-semibold text-xs uppercase tracking-[0.2em] transition-all py-2 group ${location.pathname === item.path
                ? "text-accent-primary"
                : "text-foreground-muted hover:text-accent-primary"
                }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-primary"
                  style={{ boxShadow: "0 0 10px rgba(225, 29, 72, 0.5)" }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <Link
            to="/#register"
            className="font-display font-bold text-xs uppercase tracking-[0.15em] text-foreground bg-accent-primary px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
          >
            Register
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-display font-bold text-xs uppercase tracking-widest text-accent-primary hover:text-accent-hover transition-colors p-2"
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
            className="md:hidden backdrop-blur-xl border-b border-accent-primary/10 overflow-hidden"
            style={{ background: "rgba(10, 10, 15, 0.6)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5 border-t border-accent-primary/5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`font-display font-bold text-base uppercase tracking-widest transition-colors ${location.pathname === item.path ? "text-accent-primary" : "text-foreground hover:text-accent-primary"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/#register"
                onClick={() => setOpen(false)}
                className="font-display font-bold text-sm uppercase tracking-widest text-foreground bg-accent-primary px-6 py-3 block hover:bg-accent-hover transition-all rounded-lg mt-4 shadow-lg hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
              >
                Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNav;
