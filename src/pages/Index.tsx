import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RegisterSection from "@/components/RegisterSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <>
      <TopNav />
      <main>
        <HeroSection />
        <AboutSection />
        <RegisterSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
