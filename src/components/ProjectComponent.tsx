import './projectcomponent.css'

interface ProjectProperties {
    image: string
    projectName: string
    projectLink: { link: string, linkTitle: string }
    description: string
    technologyUsed: string[]
}

function ProjectComponent({ image, projectName, projectLink, description, technologyUsed }: ProjectProperties) {
    return (
        <>
        <div className="card mb-5">
            <div className="card-body">
                <div className="row p-0">
                    <div className="col-12 col-md-5 d-flex justify-content-center align-items-center">
                        <img id="ProjectIcon" src={image} alt={`${projectName} logo`} />
                    </div>
                    <div className="col-12 col-md-7 text-center">
                        <h3>{projectName}</h3>
                        <a target="_blank" rel="noopener noreferrer" href={projectLink.link}>{projectLink.linkTitle}</a>
                        <p>{description}</p>
                        <h3 className="mb-3">Technology Used</h3>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {technologyUsed.map((technology, index) => (
                                <span className="skills" key={index}>{technology}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}; export default ProjectComponent
