import Hero from "./_sections/Hero";
import AboutSection from "./_sections/AboutSection";
import VolunteerSection from "./_sections/VolunteerSection";
import ExperienceSection from "./_sections/ExperienceSection";
import ProjectsSection from "./_sections/ProjectsSection";
import SkillsSection from "./_sections/SkillsSection";
import ContactSection from "./_sections/ContactSection";
import Footer from "@/app/components/stickyComponents/Footer";

export default function Home() {
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <Hero />
        <AboutSection />
        <VolunteerSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
      <Footer />
      {/* Future sections go here */}
    </main>
  );
}
