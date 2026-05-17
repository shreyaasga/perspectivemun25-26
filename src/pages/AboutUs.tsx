import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TopNav from "@/components/TopNav";

const executiveBoards = [
    {
        committee: "United Nations Security Council",
        abbr: "UNSC",
        members: [
            { role: "Chairperson", name: "TBA" },
            { role: "Vice Chairperson", name: "TBA" }
        ]
    },
    {
        committee: "United Nations Human Rights Council",
        abbr: "UNHRC",
        members: [
            { role: "Chairperson", name: "TBA" },
            { role: "Vice Chairperson", name: "TBA" }
        ]
    },
    {
        committee: "Disarmament and International Security",
        abbr: "DISEC",
        members: [
            { role: "Chairperson", name: "TBA" },
            { role: "Vice Chairperson", name: "TBA" }
        ]
    },
    {
        committee: "United Nations Environment Programme",
        abbr: "UNEP",
        members: [
            { role: "Chairperson", name: "TBA" },
            { role: "Vice Chairperson", name: "TBA" }
        ]
    },
    {
        committee: "All India Political Parties Meet",
        abbr: "AIPPM",
        members: [
            { role: "Moderator", name: "TBA" },
            { role: "Deputy Moderator", name: "TBA" }
        ]
    },
    {
        committee: "International Press Corps",
        abbr: "IPC",
        members: [
            { role: "Editor-in-Chief", name: "TBA" },
            { role: "Head of Photography", name: "TBA" }
        ]
    }
];

const AboutUsPage = () => {
    const [activeEb, setActiveEb] = useState(0);

    return (
        <>
            <TopNav />
            <main className="pt-24 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-display tracking-widest uppercase">
                            Who We Are
                        </div>
                        <h1 className="font-display font-bold text-4xl md:text-6xl uppercase tracking-wider text-foreground mb-6 text-glow">
                            About Us
                        </h1>
                        <div className="h-1 w-24 bg-primary mx-auto rounded-full glow-border mb-8"></div>
                        <motion.p
                            className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Welcome to Perspective MUN, where global thinking meets localized action. We are a premier Model United Nations conference dedicated to breeding the next generation of diplomats, policymakers, and global leaders through rigorous debate and collaborative problem-solving.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative modular-panel rounded-2xl p-8 md:p-12 mb-16 overflow-hidden holo-scanlines"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full z-0 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose/8 blur-[80px] rounded-full z-0 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-6">
                                Our Vision
                            </h2>
                            <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
                                We believe that every complex narrative needs a multifaceted perspective to understand. Our vision is to cultivate an inclusive, analytically rigorous, and intellectually stimulating environment for all delegates—from seasoned participants to absolute beginners.
                            </p>
                            <h2 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-wider text-foreground mb-6 mt-12">
                                The Executive Board
                            </h2>
                            <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed">
                                Perspective MUN boasts a highly vetted, internationally recognized Executive Board capable of pushing debate boundaries. Our chairs and directors are selected based on their profound understanding of world affairs, mastery of MUN procedures, and their ability to dynamically guide debate in meaningful directions.
                            </p>
                        </div>

                        {/* Executive Board Modular View */}
                        <div className="relative z-10 mt-8">
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                                {executiveBoards.map((eb, index) => (
                                    <button
                                        key={eb.abbr}
                                        onClick={() => setActiveEb(index)}
                                        className={`relative px-4 py-2 rounded-full font-display text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                                            activeEb === index
                                                ? "text-primary"
                                                : "text-muted-foreground hover:text-foreground bg-white/5"
                                        }`}
                                    >
                                        {activeEb === index && (
                                            <motion.div
                                                layoutId="active-eb-tab"
                                                className="absolute inset-0 border border-primary bg-primary/10 rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{eb.abbr}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="relative min-h-[200px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeEb}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-6 md:p-8 rounded-2xl border border-primary/20 bg-background/50 focus:outline-none"
                                    >
                                        <h3 className="font-display font-bold text-xl md:text-2xl text-primary mb-6 text-glow">
                                            {executiveBoards[activeEb].committee}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {executiveBoards[activeEb].members.map((member, mIndex) => (
                                                <div key={mIndex} className="flex flex-col md:flex-row md:items-center justify-between bg-black/30 p-4 rounded-xl border-l-2 border-l-rose border border-white/5 gap-2">
                                                    <span className="font-body text-xs md:text-sm font-bold text-primary/80 uppercase tracking-[0.2em]">{member.role}</span>
                                                    <span className="font-body text-sm md:text-base text-foreground font-medium">{member.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
        </>
    );
};

export default AboutUsPage;
