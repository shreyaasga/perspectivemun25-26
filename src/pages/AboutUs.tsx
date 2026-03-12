import { motion } from "framer-motion";
import TopNav from "@/components/TopNav";

const AboutUsPage = () => {
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
                        {(() => {
                            const text = "Welcome to Perspective MUN, where global thinking meets localized action. We are a premier Model United Nations conference dedicated to breeding the next generation of diplomats, policymakers, and global leaders through rigorous debate and collaborative problem-solving.";
                            return (
                                <motion.p
                                    className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 1 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.02,
                                            },
                                        },
                                    }}
                                >
                                    {text.split("").map((char, index) => (
                                        <motion.span
                                            key={`${char}-${index}`}
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 },
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.p>
                            );
                        })()}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative glass-panel rounded-2xl p-8 md:p-12 mb-16 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full z-0 pointer-events-none" />
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
                    </motion.div>

                </div>
            </main>
        </>
    );
};

export default AboutUsPage;
