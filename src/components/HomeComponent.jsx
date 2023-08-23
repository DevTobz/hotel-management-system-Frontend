import './HomeComponent.css'
import { useRef,useEffect } from 'react';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


gsap.registerPlugin(ScrollTrigger);


const home = () => {
      const textRef = useRef(null);

    /*useEffect(()=>{
        console.log(textRef);
    },[textRef])*/

  
    return ( 
        <>
        <div className="homeAnime">
            <div className="acontainer">
                <p ref={textRef} className='aText'>Bliss Hotel</p>
                <p className='aText'>Your comfort is our <b className='bold'>PRIORITY</b></p>
            </div>

        </div>
        </>
     );
}
 
export default withRouter(home);