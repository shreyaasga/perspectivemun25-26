import { motion } from "framer-motion";
import TopNav from "@/components/TopNav";
import { CheckCircle2, Circle } from "lucide-react";

const timelineEvents = [
    {
        title: "Venue Announcement",
        date: "TBA",
        description: "Stay tuned for the grand reveal of our conference venue.",
        completed: true,
    },
    {
        title: "Executive Board Announcement",
        date: "TBA",
        description: "Meet the experienced Chairs who will be directing the committees.",
        completed: false,
    },
    {
        title: "Registration Opens",
        date: "TBA",
        description: "Delegate and international press applications officially open.",
        completed: false,
    },
    {
        title: "Background Guides Released",
        date: "TBA",
        description: "Study materials for each committee will be made available.",
        completed: false,
    },
    {
        title: "Conference Day 1",
        date: "TBA",
        description: "Opening ceremony and first committee sessions.",
        completed: false,
    },
    {
        title: "Conference Day 2",
        date: "TBA",
        description: "Continued debate, crisis updates, and closing ceremony.",
        completed: false,
    }
];

const TimelinePage = () => {
    return (
        <>
            <TopNav />
            <main className="pt-24 pb-24 px-6 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-display tracking-widest uppercase">
                            Journey
                        </div>
                        <h1 className="font-display font-bold text-4xl md:text-6xl uppercase tracking-wider text-foreground mb-6 text-glow">
                            Timeline
                        </h1>
                        <div className="h-1 w-24 bg-primary mx-auto rounded-full glow-border mb-8"></div>
                        <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Follow our journey to the conference. Keep an eye out for important announcements and milestones.
                        </p>
                    </motion.div>

                    <div className="relative pl-8 md:pl-0">
                        {/* Vertical line passing through the middle on desktop, left on mobile */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 md:-translate-x-1/2"></div>
                        
                        <div className="space-y-12">
                            {timelineEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between ${
                                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                                >
                                    {/* Icon sitting on the line */}
                                    <div className="absolute left-[-16px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.3)] z-10">
                                        {event.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-muted-foreground" />
                                        )}
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-[45%] ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"} pl-8 md:pl-0`}>
                                        <div className={`glass-panel p-6 rounded-xl border-l-4 ${event.completed ? "border-l-primary bg-primary/5" : "border-l-muted-foreground/30"}`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-display tracking-wider text-primary uppercase">{event.date}</span>
                                            </div>
                                            <h3 className="text-xl font-display font-bold uppercase tracking-wide text-foreground mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-sm font-body text-muted-foreground">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TimelinePage;
