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
        // Cycle to the next motion when the user moves away
        setMotionIndex((prev) => (prev + 1) % motionsList.length);
    };

    if (!isVisible) return null;

    const currentMotion = motionsList[motionIndex];

    return (
        // Moved to the bottom left side to balance the layout
        <div
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 lg:right-12 z-50 flex flex-col items-center pointer-events-auto group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Close Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                }}
                className="absolute top-0 right-0 z-50 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-full text-white/70 hover:text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 -translate-y-4 translate-x-4"
                title="Dismiss Mascot"
            >
                <X size={14} />
            </button>

            {/* 3D Scene Container */}
            <div className="relative w-48 h-56 hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center justify-end cursor-pointer">

                {/* Animated Placard */}
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1, type: "spring", bounce: 0.3 }}
                    // Mirrored to point outwards to the left towards the center of the screen
                    className="absolute top-0 left-[-30px] z-30 origin-bottom-left"
                >
                    <div className="bg-primary/95 backdrop-blur-md text-primary-foreground font-bold p-3.5 rounded-xl shadow-2xl border border-primary/50 relative flex flex-col items-center min-w-[140px] max-w-[200px] text-center">

                        <AnimatePresence mode="wait">
                            {!isHovered ? (
                                <motion.span
                                    key="asking"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.2 }}
                                    className="text-xs tracking-wide"
                                >
                                    Can I raise a motion?
                                </motion.span>
                            ) : (
                                <motion.div
                                    key="motionCTA"
                                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex flex-col gap-3 w-full"
                                >
                                    <span className="text-[11px] leading-tight font-medium">
                                        "{currentMotion.text}"
                                    </span>
                                    <Link
                                        to={currentMotion.link}
                                        className="bg-black text-primary text-[10px] uppercase tracking-wider py-2 px-3 rounded shadow-md hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 font-extrabold"
                                    >
                                        {currentMotion.btnText}
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Placard Pole */}
                        <div className="absolute -bottom-20 left-8 w-2 h-20 bg-gradient-to-r from-slate-400 to-slate-300 border-r border-slate-500 shadow-xl" />
                    </div>
                </motion.div>

                {/* Mascot Character */}
                <div className="absolute bottom-[4.5rem] w-16 h-20 z-10 flex flex-col items-center">
                    {/* Head */}
                    <motion.div
                        className="w-12 h-12 rounded-full bg-slate-200 shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.3)] relative"
                        animate={{ rotateZ: [-2, 2, -2], y: [0, 2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Eyes */}
                        <div className="absolute top-4 left-3 flex gap-2">
                            <motion.div className="w-1.5 h-2.5 bg-slate-800 rounded-full" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }} />
                            <motion.div className="w-1.5 h-2.5 bg-slate-800 rounded-full" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }} />
                        </div>
                    </motion.div>

                    {/* Body/Suit */}
                    <div className="w-14 h-12 bg-slate-800 rounded-t-2xl shadow-lg relative overflow-hidden -mt-2 border-t border-slate-600">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-white rounded-b flex justify-center border-x border-slate-400">
                            <div className="w-1.5 h-full bg-red-600 rounded-b shadow-inner" />
                        </div>
                    </div>

                    {/* Raised Arm */}
                    <motion.div
                        className="absolute left-0 top-12 w-4 h-16 bg-slate-800 rounded-full origin-top-right shadow-[inset_2px_0_4px_rgba(0,0,0,0.4)]"
                        initial={{ rotateZ: 20 }}
                        animate={{ rotateZ: 145 }}
                        transition={{ delay: 1, duration: 1, type: "spring", bounce: 0.3 }}
                    />
                </div>

                {/* Proper Podium/Desk */}
                <div className="w-44 h-20 relative z-20 flex flex-col items-center justify-end">
                    {/* Desk Top */}
                    <div className="w-48 h-6 bg-slate-700 rounded-t-sm border-t border-slate-400 shadow-[0_-4px_15px_rgba(0,0,0,0.6)] z-10 relative flex justify-center">
                        {/* Country Placard */}
                        <div className="absolute -top-4 w-24 h-5 bg-white border-2 border-slate-300 shadow-md flex items-center justify-center rounded-sm">
                            <span className="text-[9px] text-black font-extrabold uppercase tracking-widest">Delegate</span>
                        </div>
                        {/* Mic */}
                        <div className="absolute -top-8 left-6 w-1 h-8 bg-zinc-400 rotate-12 origin-bottom shadow-sm">
                            <div className="absolute -top-2 -left-1 w-3 h-3 bg-zinc-800 rounded-full shadow-md" />
                        </div>
                    </div>

                    {/* Desk Front Panel */}
                    <div className="w-44 h-16 bg-gradient-to-b from-slate-800 to-slate-950 border-x border-b border-slate-700 rounded-b-xl shadow-2xl flex justify-center items-center relative overflow-hidden">
                        {/* Wood/Paneling Lines */}
                        <div className="absolute inset-0 opacity-10 flex justify-between px-6">
                            <div className="w-px h-full bg-white" />
                            <div className="w-px h-full bg-white" />
                        </div>
                        {/* UN Logo Mock */}
                        <div className="w-10 h-10 rounded-full border-2 border-sky-500/30 flex items-center justify-center bg-sky-900/40 backdrop-blur-sm z-10">
                            <div className="flex gap-1.5">
                                <div className="w-1 h-5 bg-sky-400/70 rounded-full" />
                                <div className="w-1 h-7 bg-sky-400/90 rounded-full -mt-1" />
                                <div className="w-1 h-5 bg-sky-400/70 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DelegateMascot;
