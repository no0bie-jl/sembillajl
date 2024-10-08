import './educationcomponent.css'
interface EducationProperties{
    SchoolName: String
    SchoolYear: {to: number, from: number}
    Description: String
    Skills: String[]
}

function EducationComponent({ SchoolName, Description, SchoolYear, Skills } : EducationProperties) {
    return(
        <>
        <div className="card mb-3">
            <div className="card-header">
                <div className="row">
                    <div className="col text-start">
                        {SchoolName}
                    </div>
                    <div className="col text-end">
                        {`${SchoolYear.from} - ${SchoolYear.to}`}
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p>{Description}</p>
            </div>
            <div className="card-footer">
            <h6>Skills I've Acquired</h6>
                    {Skills.map((skill, index) =>(
                        <span className='skills me-3' key={index}>{skill}</span>
                    ))}
            </div>
        </div>
        </>
    );
}; export default EducationComponent