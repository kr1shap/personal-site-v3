import Hero from "./_sections/Hero";
import AboutSection from "./_sections/AboutSection";
import VolunteerSection from "./_sections/VolunteerSection";
import ExperienceSection from "./_sections/ExperienceSection";
import MusicSection from "./_sections/MusicSection";
import ProjectsSection from "./_sections/ProjectsSection";
import SkillsSection from "./_sections/SkillsSection";
import ContactSection from "./_sections/ContactSection";
import Footer from "@/app/components/stickyComponents/Footer";
import {
  getExperienceData,
  getProjectsData,
  getSkillSetData,
  getVolunteerData,
} from "@/app/lib/portfolioData";

export default function Home() {
  const experienceData = getExperienceData();
  const projectsData = getProjectsData();
  const skillSetData = getSkillSetData();
  const volunteerData = getVolunteerData();

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-(--cream)">
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <Hero />
        <AboutSection />
        <VolunteerSection entries={volunteerData.volunteer} />
        <ExperienceSection entries={experienceData.experience} />
        <ProjectsSection projects={projectsData} />
        <MusicSection />
        <SkillsSection skillSet={skillSetData} />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
