import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const motionsList = [
    { text: "Motion to view the committees.", link: "/committees", btnText: "Seconded. View Committees" },
    { text: "Motion to view the about section.", link: "/about", btnText: "Seconded. About Us" },
    { text: "Motion to view the FAQs.", link: "/faqs", btnText: "Seconded. Read FAQs" },
    { text: "Motion to register for Perspective.", link: "/#register", btnText: "Seconded. Register Now" },
];

const DelegateMascot = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [motionIndex, setMotionIndex] = useState(0);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMotionIndex((prev) => (prev + 1) % motionsList.length);
    };

    if (!isVisible) return null;

    const currentMotion = motionsList[motionIndex];

    return (
        <div
            className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-40 flex flex-col items-center pointer-events-auto group overflow-visible"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Close Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                }}
                className="absolute -top-1 -right-1 z-50 p-1 bg-black/50 hover:bg-primary/80 rounded-full text-white/70 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                title="Dismiss Mascot"
            >
                <X size={12} />
            </button>

            {/* Scene Container - scaled down on mobile */}
            <div className="relative w-32 h-40 md:w-48 md:h-56 hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center justify-end cursor-pointer scale-100 md:scale-100">

                {/* Animated Placard */}
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1, type: "spring", bounce: 0.3 }}
                    className="absolute top-0 left-[-10px] md:left-[-30px] z-30 origin-bottom-left"
                >
                    <div className="bg-primary/95 backdrop-blur-md text-primary-foreground font-bold p-2.5 md:p-3.5 rounded-xl shadow-2xl border border-primary/50 relative flex flex-col items-center min-w-[100px] md:min-w-[140px] max-w-[160px] md:max-w-[200px] text-center">

                        <AnimatePresence mode="wait">
                            {!isHovered ? (
                                <motion.span
                                    key="asking"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[9px] md:text-xs tracking-wide"
                                >
                                    Can I raise a motion?
                                </motion.span>
                            ) : (
                                <motion.div
                                    key="motionCTA"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex flex-col gap-2 md:gap-3 w-full"
                                >
                                    <span className="text-[9px] md:text-[11px] leading-tight font-medium">
                                        "{currentMotion.text}"
                                    </span>
                                    <Link
                                        to={currentMotion.link}
                                        className="bg-black text-primary text-[8px] md:text-[10px] uppercase tracking-wider py-1.5 md:py-2 px-2 md:px-3 rounded shadow-md hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 transition-all duration-300 font-extrabold"
                                    >
                                        {currentMotion.btnText}
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Placard Pole */}
                        <div className="absolute -bottom-14 md:-bottom-20 left-5 md:left-8 w-1.5 md:w-2 h-14 md:h-20 bg-gradient-to-r from-slate-400 to-slate-300 border-r border-slate-500 shadow-xl" />
                    </div>
                </motion.div>

                {/* Mascot Character */}
                <div className="absolute bottom-[3rem] md:bottom-[4.5rem] w-10 h-14 md:w-16 md:h-20 z-10 flex flex-col items-center">
                    {/* Head */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-slate-200 shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.3)] relative">
                        {/* Eyes */}
                        <div className="absolute top-3 left-2 md:top-4 md:left-3 flex gap-1.5 md:gap-2">
                            <div className="w-1 h-1.5 md:w-1.5 md:h-2.5 bg-slate-800 rounded-full" />
                            <div className="w-1 h-1.5 md:w-1.5 md:h-2.5 bg-slate-800 rounded-full" />
                        </div>
                    </div>

                    {/* Body/Suit */}
                    <div className="w-10 h-8 md:w-14 md:h-12 bg-slate-800 rounded-t-2xl shadow-lg relative overflow-hidden -mt-1.5 md:-mt-2 border-t border-slate-600">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 md:w-4 md:h-6 bg-white rounded-b flex justify-center border-x border-slate-400">
                            <div className="w-1 h-full bg-primary rounded-b shadow-inner" />
                        </div>
                    </div>

                    {/* Raised Arm */}
                    <motion.div
                        className="absolute left-0 top-8 md:top-12 w-3 h-10 md:w-4 md:h-16 bg-slate-800 rounded-full origin-top-right shadow-[inset_2px_0_4px_rgba(0,0,0,0.4)]"
                        initial={{ rotateZ: 20 }}
                        animate={{ rotateZ: 145 }}
                        transition={{ delay: 1, duration: 1, type: "spring", bounce: 0.3 }}
                    />
                </div>

                {/* Podium/Desk */}
                <div className="w-28 h-14 md:w-44 md:h-20 relative z-20 flex flex-col items-center justify-end">
                    {/* Desk Top */}
                    <div className="w-32 h-4 md:w-48 md:h-6 bg-slate-700 rounded-t-sm border-t border-slate-400 shadow-[0_-4px_15px_rgba(0,0,0,0.6)] z-10 relative flex justify-center">
                        {/* Country Placard */}
                        <div className="absolute -top-3 md:-top-4 w-16 md:w-24 h-3.5 md:h-5 bg-white border-2 border-slate-300 shadow-md flex items-center justify-center rounded-sm">
                            <span className="text-[6px] md:text-[9px] text-black font-extrabold uppercase tracking-widest">Delegate</span>
                        </div>
                        {/* Mic */}
                        <div className="absolute -top-5 md:-top-8 left-4 md:left-6 w-0.5 md:w-1 h-5 md:h-8 bg-zinc-400 rotate-12 origin-bottom shadow-sm">
                            <div className="absolute -top-1.5 -left-0.5 md:-top-2 md:-left-1 w-2 md:w-3 h-2 md:h-3 bg-zinc-800 rounded-full shadow-md" />
                        </div>
                    </div>

                    {/* Desk Front Panel */}
                    <div className="w-28 h-10 md:w-44 md:h-16 bg-gradient-to-b from-slate-800 to-slate-950 border-x border-b border-slate-700 rounded-b-xl shadow-2xl flex justify-center items-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 flex justify-between px-4 md:px-6">
                            <div className="w-px h-full bg-white" />
                            <div className="w-px h-full bg-white" />
                        </div>
                        {/* UN Logo Mock */}
                        <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border-2 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/20 to-rose/10 backdrop-blur-sm z-10">
                            <div className="flex gap-0.5 md:gap-1.5">
                                <div className="w-0.5 h-3 md:w-1 md:h-5 bg-primary/70 rounded-full" />
                                <div className="w-0.5 h-4 md:w-1 md:h-7 bg-rose/90 rounded-full -mt-0.5 md:-mt-1" />
                                <div className="w-0.5 h-3 md:w-1 md:h-5 bg-warm-red/70 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DelegateMascot;
