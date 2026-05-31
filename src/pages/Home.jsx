import Navbar from "../components/UI/Navbar"
import HeroSection from "../components/Hero/HeroSection"
import WorkSectionSeperator from "../components/MyWork/WorkSection"
import WorkCollection from "../components/MyWork/WorkCollection"
import TechSkill from "../components/TechStack/TechSkillSection"

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WorkSectionSeperator/>
      <WorkCollection />
      <TechSkill/>
    </>
  )
}

export default App
