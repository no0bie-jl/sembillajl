import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import './linksocials.css';
function LinkSocials(){
    return(
        <div className="p-2 d-flex">
            <span className='iconSocials'><a href="linkedin.com/in/sembilla/"><FaLinkedin/></a></span>
            <span className='iconSocials'><a href="instagram.com/lyodiiii/"><FaSquareInstagram/></a></span>
            <span className='iconSocials'><a href="mailto:johnlyodsembilla02@gmail.com"><MdEmail/></a></span>
        </div>
    );
}; export default LinkSocials