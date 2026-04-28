import { motion } from "framer-motion";
import { useState } from "react";
import TopNav from "@/components/TopNav";

const faqs = [
  {
    q: "What is Model United Nations?",
    a: "Model United Nations (MUN) is an educational simulation where students role-play as delegates of the United Nations, debating real-world issues and drafting resolutions.",
  },
  {
    q: "Who can participate in Perspective MUN?",
    a: "Students from high school and university are welcome to participate. No prior MUN experience is required — we have committees for all experience levels.",
  },
  {
    q: "What is the registration fee?",
    a: "Registration details and fees will be announced shortly. Follow our social channels for the latest updates.",
  },
  {
    q: "Is accommodation provided?",
    a: "We offer accommodation assistance for outstation delegates. Please fill out the accommodation form during registration to avail this service.",
  },
  {
    q: "What should I prepare before the conference?",
    a: "Once registered, you will receive your country and committee allocation along with a background guide. We recommend researching your country's stance on the agenda topic.",
  },
  {
    q: "What is the dress code?",
    a: "Western formals are the standard dress code for all committee sessions. Delegates are expected to dress professionally throughout the conference.",
  },
];

const TypewriterText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + index * 0.015 }}
          className={char === " " ? "mr-1" : "inline"}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const FAQsPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <TopNav />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-4xl md:text-6xl uppercase tracking-wider text-foreground mb-4"
          >
            FAQs
          </motion.h1>
          <p className="font-body text-sm text-muted-foreground mb-16">
            Everything you need to know before the conference.
          </p>

          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="cursor-pointer"
                style={{ borderBottom: "1px solid hsl(var(--primary) / 0.15)" }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center justify-between py-6">
                  <p className="font-display font-semibold text-sm md:text-base text-foreground uppercase tracking-wide pr-4">
                    {faq.q}
                  </p>
                  <span className="font-body text-primary text-lg shrink-0">
                    {open === i ? "−" : "+"}
                  </span>
                </div>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-sm text-foreground/80 pb-6 leading-relaxed">
                      <TypewriterText text={faq.a} delay={0.1} />
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default FAQsPage;
