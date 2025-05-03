import About from "@/components/About";
import Contacts from "@/components/Contacts";
import NavBar from "@/components/Navbar";
import Project from "@/components/Projects";
import Skills from "@/components/Skills";
import Who from "@/components/Who";
import Work from "@/components/Works";
import { useState } from "react";

export default function AboutPage() {
    const [isOpenWho, setIsOpenWho] = useState(false);
    const [isOpenSkills, setIsOpenSkills] = useState(false);
    const [isOpenWork, setIsOpenWork] = useState(false);
    const [isOpenProject, setIsOpenProject] = useState(false);
    const [isOpenContact, setIsOpenContact] = useState(false);
    return (
        <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
            <NavBar />
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
        </div>
    );
}
