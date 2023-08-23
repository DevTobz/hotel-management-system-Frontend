import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';


const Navbar = () => {

    const [isToggled,setIsToggled] = useState(false);
    const outerToggleStyle={
        backgroundColor: isToggled? "green":"black",
        justifyContent: isToggled ? 'flex-end' : 'flex-start',
    }
    const innerToggleStyle={
        backgroundColor: isToggled? "black":"white"
    }
    const doToggle = ()=>{
        setIsToggled(prev=>!prev)
        
    }
    return ( 
        <div className='nav-bar'>
            <div className='search-div'>
                <input type="text" name="searchValue" id="searchBox" placeholder='Search' />
                <div className='searchIcon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

            </div>
            <div className='date-div'>
               {/* intergrate a date api here for the display of date */}
            </div>
            <div className='animation-div'>
                <div className="toggle-div" style={outerToggleStyle} onClick={doToggle}>
                    <div className="inner-toggle" style={innerToggleStyle}>

                    </div>

                </div>
                <div className="logout-div">
                   
                   <Link className='logout' to='/login'> <FontAwesomeIcon icon={faRightFromBracket} size='lg'/></Link> 
                </div>
           
            </div>
        </div>
     );
}
 
export default Navbar;