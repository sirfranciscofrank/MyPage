import Navbar from "../components/UI/Navbar"
import HeroSection from "../components/Hero/HeroSection"
import WorkSectionSeperator from "../components/MyWork/WorkSection"
import WorkCollection from "../components/MyWork/WorkCollection"
import TechSkill from "../components/TechStack/TechSkillSection"
import AboutMeSeperator from "../components/AboutMe/AboutMeSection"
import Resume from "../components/AboutMe/Resume"
import ContactMe from "../components/ContactMe/ContactMe"
import MyPic from "../assets/images/MyPic.jpg"

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <HeroSection />
        <WorkSectionSeperator />
        <WorkCollection />
        <TechSkill />
        <AboutMeSeperator />
        <Resume photo={MyPic} />
        <ContactMe />
      </div>
    </>
  )
}

export default App
