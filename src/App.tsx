import { useEffect, useRef, useState } from "react";
import ShadowCursor from "./functions/ShadowCursor";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Certification1 from './assets/imgs/cert1.png';


//Import Components
import LinkSocials from "./components/LinkSocials";
import Informations from "./components/Informations";
import EducationComponent from "./components/EducationComponent";
import ExperienceComponent from "./components/ExperienceComponent";
import Certification from "./components/Certification";
import ProjectComponent from "./components/ProjectComponent";

type MenuState = {
  about: number,
  education: number,
  experience: number,
  projects: number,
  certifications: number
}

const SECTION_MENU_MAP: { id: string; menu: keyof MenuState }[] = [
  { id: 'about', menu: 'about' },
  { id: 'education', menu: 'education' },
  { id: 'experiences', menu: 'experience' },
  { id: 'certifications', menu: 'certifications' },
  { id: 'projects', menu: 'projects' },
];

function createSelectedMenu(menuName: keyof MenuState): MenuState {
  return { about: 0, education: 0, experience: 0, projects: 0, certifications: 0, [menuName]: 1 };
}

export default function App() {
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({x: 0, y:0});
  const [selectedMenu, setSelectedMenu] = useState<MenuState>(createSelectedMenu('about'));

  function isSelected(menuName: keyof MenuState) {
    setSelectedMenu(createSelectedMenu(menuName));
  }

  useEffect(() =>{
    document.title = "JL Sembilla";
    const handleMouseMove = (event: MouseEvent) =>{
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const scrollContainer = rightColumnRef.current;
    if (!scrollContainer) return;

    const updateActiveSection = () => {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const scrollOffset = 120;
      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 50;

      const resolveActiveMenu = (): keyof MenuState => {
        if (isAtBottom) {
          return SECTION_MENU_MAP[SECTION_MENU_MAP.length - 1].menu;
        }

        let activeMenu: keyof MenuState = 'about';

        for (const { id, menu } of SECTION_MENU_MAP) {
          const section = document.getElementById(id);
          if (!section) continue;

          const sectionTop = section.getBoundingClientRect().top - containerTop;
          if (sectionTop <= scrollOffset) {
            activeMenu = menu;
          }
        }

        return activeMenu;
      };

      const activeMenu = resolveActiveMenu();

      setSelectedMenu((current) => {
        const next = createSelectedMenu(activeMenu);
        const isSameSelection = (Object.keys(next) as (keyof MenuState)[]).every(
          (key) => current[key] === next[key]
        );

        return isSameSelection ? current : next;
      });
    };

    updateActiveSection();
    scrollContainer.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      scrollContainer.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return(
    <>
      <ShadowCursor x={mousePosition.x} y={mousePosition.y} />
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-lg-5 leftsideOfCol">
              <div className="d-flex align-items-center h-100">
                <div className="p-5">
                    <h1>John Lyod M. Sembilla</h1>
                    <h3>Full Stack Developer</h3>
                    <p>I’m an enthusiastic and ambitious software developer
                      who loves building meaningful applications, learning
                      new technologies, and turning complex problems into clean,
                      working code—usually with a cup of coffee nearby.
                    </p>
                    <div>
                    <div className="row mt-5 d-flex align-items-center" onClick={() => { isSelected('about') }}>
                        <div className={`${selectedMenu.about === 1 ? 'col-2 p-1' : 'col-1 p-1'}`}>
                          <div className={`MenuLine ${selectedMenu.about === 1 ? 'expanded' : ''}`} />
                          </div>
                          <div className="col p-1 text-start">
                            <a href="#about" className="menuItem">ABOUT</a>
                            </div>
                          </div>
                      
                      <div className="row d-flex align-items-center" onClick={() => { isSelected('education') }}>
                        <div className={`${selectedMenu.education === 1 ? 'col-2 p-1' : 'col-1 p-1'}`}>
                          <div className={`MenuLine ${selectedMenu.education === 1 ? 'expanded' : ''}`} />
                          </div>
                          <div className="col p-1 text-start">
                            <a href="#education" className="menuItem">EDUCATION</a>
                            </div>
                          </div>

                          <div className="row d-flex align-items-center" onClick={() => { isSelected('experience') }}>
                        <div className={`${selectedMenu.experience === 1 ? 'col-2 p-1' : 'col-1 p-1'}`}>
                          <div className={`MenuLine ${selectedMenu.experience === 1 ? 'expanded' : ''}`} />
                          </div>
                          <div className="col p-1 text-start">
                            <a href="#experiences" className="menuItem">EXPERIENCES</a>
                            </div>
                          </div>


                          <div className="row d-flex align-items-center" onClick={() => { isSelected('certifications') }}>
                        <div className={`${selectedMenu.certifications === 1 ? 'col-2 p-1' : 'col-1 p-1'}`}>
                          <div className={`MenuLine ${selectedMenu.certifications === 1 ? 'expanded' : ''}`} />
                          </div>
                          <div className="col p-1 text-start">
                            <a href="#certifications" className="menuItem">CERTIFICATIONS</a>
                            </div>
                          </div>


                          <div className="row d-flex align-items-center" onClick={() => { isSelected('projects') }}>
                        <div className={`${selectedMenu.projects === 1 ? 'col-2 p-1' : 'col-1 p-1'}`}>
                          <div className={`MenuLine ${selectedMenu.projects === 1 ? 'expanded' : ''}`} />
                          </div>
                          <div className="col p-1 text-start">
                            <a href="#projects" className="menuItem">PROJECTS</a>
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="col">
                            <div className="socialLinks">
                            <LinkSocials />
                            </div>
                            </div>
                          </div>
                    </div>
                    <h6 className="textInfo">Created with React & Vite!</h6>
                </div>
            </div>
          </div>

          {/* MY INFORMATION */}

          {/* ABOUT */}
          
          <div className="col-lg-7 p-5 rightsideOfCol" ref={rightColumnRef}>
            <div id="about" className="row mb-5">
            
              <div className="d-flex justify-content-center h-100">
                <div className="px-0 py-5 px-lg-5 px-sm-1">
                  <div className="aboutPage">
                    <a href="#"><span className="btn btn-primary mb-5 backToMenu">Back to Menu</span></a>
                    <Informations />
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATION */}
            <div id="education" className="row mb-5 p-5 d-flex justify-content-center">
              
            <EducationComponent
            SchoolName={"La Concepcion College (College)"}
            Description={"I earned a Bachelor of Science in Information Systems. During my studies, I took on leadership roles in several projects, particularly our thesis project. We developed an automated queuing system utilizing Arduino and RFID technology. The system included Java-based software for administrative control and a web-based application for students, created using HTML, JavaScript, PHP, Bootstrap, AJAX, and SQL for the relational database. This application allowed students to view their queue number and access their account information."
            }
            SchoolYear={{from:2021, to:2024}}
            Skills={["Java","Bootstrap", "PHP", "SQL"]}
            />

            <EducationComponent
            SchoolName={"STI College (College)"}
            Description={"Here, I acquired fundamental knowledge of Java, including various concepts of Object-Oriented Programming, as well as the basics of data structures and algorithms. For our final project during the first year, I developed a console-based mini system using Java and arrays for data storage."
            }
            SchoolYear={{from:2019, to:2020}}
            Skills={["Java", "PHP"]}
            />

            <EducationComponent
            SchoolName={"Bulacan College of Commerce and Trade (SHS)"}
            Description={"I had the opportunity to serve as the lead programmer for a research project where my team and I developed a library system. We utilized Visual Basic Studio as the IDE, VB.NET for both the backend and frontend, and SQL for the relational database. The project aimed to streamline library transactions at Bulacan College of Commerce and Trade. It was an honor to see our project significantly benefit the school, administrators, librarians, and students after its implementation in the following academic year. Additionally, we received recognition for outstanding research within our batch. This achievement motivated me to pursue a related course in college."}
            SchoolYear={{from:2017, to:2019}}
            Skills={["VB.NET","SQL", "Java"]}
            />
            </div>

            
            {/* EXPERIENCES */}
            <div id="experiences" className="row mb-5 p-5 d-flex justify-content-center">
            
              <ExperienceComponent
                CompanyName={"Inventi Asia"}
                Role={"Full Stack Developer"}
                Responsibilities={[
                  "Developed and maintained full-stack web application features with minimal production issues.",
                  "Collaborated with mobile developers to implement new functionalities and improve system performance.",
                  "Assisted in deployment and management of client accounts and web applications",
                  "Worked with databases, APIs, and responsive UI components to deliver scalable solutions",
                  "Practiced clean architecture and apply KISS principle to ensure that delivered outputs always promotes readability and optimization",
                  "Worked with databases, APIs, and responsive UI components to deliver scalable solutions."]}
                Year={{from: 2025, to: 2026}}
              />
              
              <ExperienceComponent
                CompanyName={"Motorcentral Yamaha"}
                Role={"Intern"}
                Responsibilities={["Utilizes tools to assist customers.", "Creates document request for customers in LTO.", "Hardware and network support"]}
                Year={{from: 2023, to: 2024}}
              />

              <ExperienceComponent
                CompanyName={"Teleperformance Philippines"}
                Role={"Technical Support Representative"}
                Responsibilities={["Assist customer with their network concerns.", "Communicate effectively using English language.", "Troubleshoot customer's problem."]}
                Year={{from: 2022, to: 2023}}
              />

              <ExperienceComponent
                CompanyName={"Freelancing"}
                Role={"Student Freelancer"}
                Responsibilities={["Taking commission based paper school works.", "Taking small programming projects.", "Taking commission based programming school works."]}
                Year={{from: 2017, to: 2024}}
              />
            </div>


            {/* CERTIFICATIONS */}

            <div id="certifications" className="row mb-5 p-5 d-flex justify-content-center">
              <div className="col-12 col-lg-6 mb-5">
                <Certification 
                  ImgDisplay={Certification1}
                  Date="June 27, 2024"
                  Learnings={["Gain insights about what cybersecurity all about.", "Meet different people working in cybersecurity field.", "Talk about what different tools that they are using."]}
                />
              </div>

              <div className="col-12 col-lg-6 mb-5">
                <Certification 
                  ImgDisplay={Certification1}
                  Date="June 27, 2024"
                  Learnings={["Gain insights about what cybersecurity all about.", "Meet different people working in cybersecurity field.", "Talk about what different tools that they are using."]}
                />
              </div>
            </div>

            {/* PROJECTS */}
            
            <div id="projects" className="row mb-5 p-5 d-flex justify-content-center">

            <ProjectComponent
                image={"./src/assets/imgs/lamoto_preview.png"}
                projectName="Point of Sale System for LA moto"
                projectLink={{ link: "http://lamotoofficialstore.com/", linkTitle: "View Site" }}
                description="LA Moto promotional page and point of sale system for a motorcycle store.
                It allows the store to manage their inventory, sales, and customers."
                technologyUsed={["PHP", "MySQL", "HTML", "CSS", "JavaScript"]}
              />

              <ProjectComponent
                image={"./src/assets/imgs/iqueue_preview.png"}
                projectName="IQueue"
                projectLink={{ link: "https://www.canva.com/design/DAGE1h5rUS4/IMFgRMbR4zK9R4ZGyw-vzA/edit", linkTitle: "Manual" }}
                description="iQueue automates queuing at La Concepcion College’s cashier
                and registrar offices using IoT to collect data from hardware devices
                and store it in cloud databases, thereby enhancing data centralization
                and access."
                technologyUsed={["Java", "Javascript", "CSS", "AJAX", "SQL"]}
              />

              <ProjectComponent
                image={"./src/assets/imgs/heart_guide_preview.jpg"}
                projectName="Blood Pressure Journal"
                projectLink={{ link: "https://drive.google.com/file/d/1_BJzxiS_rGwCF6-FkR-JbUAKvPnI2pUK/view", linkTitle: "View Frontend" }}
                description="Heart Guide is a blood pressure journal application intended for 
                use at the Barangay Health Center in Sto. Cristo, San Jose Del Monte, Bulacan.
                 It allows patients to effectively monitor their blood pressure and includes a 
                 statistical reporting feature to aid in medical consultations."
                technologyUsed={["Java", "SQL"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};