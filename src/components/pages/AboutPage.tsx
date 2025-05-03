import About from "@/components/About";
import Who from "@/components/Who";
import { useState } from "react";
import HomePage from "./HomePage";
import Skills from "../Skills";
import Work from "../Works";
import Contacts from "../Contacts";
import Project from "../Projects";

export default function AboutPage() {
  const [isOpenWho, setIsOpenWho] = useState(false);
  const [isOpenSkills, setIsOpenSkills] = useState(false);
  const [isOpenWork, setIsOpenWork] = useState(false);
  const [isOpenProject, setIsOpenProject] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);

  return (
    <div className="flex flex-col w-3/4 space-y-6 my-[40%] sm:my-[10%]">
      <About
        isOpen={isOpenWho}
        toggleOpen={() => setIsOpenWho((prev) => !prev)}
        iconSrc="/pngs/question.png"
        title="Who am I"
        renderContent={() => <Who />}
      />
      <About
        isOpen={isOpenSkills}
        toggleOpen={() => setIsOpenSkills((prev) => !prev)}
        iconSrc="/pngs/skill.png"
        title="Skills"
        renderContent={() => <Skills />}
      />
      <About
        isOpen={isOpenProject}
        toggleOpen={() => setIsOpenProject((prev) => !prev)}
        iconSrc="/pngs/projects.png"
        title="Projects"
        renderContent={() => <Project />}
      />
      <About
        isOpen={isOpenWork}
        toggleOpen={() => setIsOpenWork((prev) => !prev)}
        iconSrc="/pngs/work.png"
        title="Work"
        renderContent={() => <Work />}
      />
      <About
        isOpen={isOpenContact}
        toggleOpen={() => setIsOpenContact((prev) => !prev)}
        iconSrc="/pngs/call.png"
        title="Contacts"
        renderContent={() => <Contacts />}
      />
    </div>
  );
}
