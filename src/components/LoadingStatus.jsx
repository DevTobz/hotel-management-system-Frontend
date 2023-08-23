import './LoadingStatus.css'
import { gsap } from 'gsap-trial';
//import { duration } from 'moment';
//import { duration } from 'moment';
import { useRef,useEffect,useLayoutEffect } from 'react';

const loadingStatus = () => {
    const boxRef = useRef([]);
    boxRef.current = [];
    const boxOneRef = useRef(null);
    useEffect(()=>{
          
        const fromAnimation = gsap.to(boxRef.current,{
            y:-7,
            repeat:-1,
            yoyo:true,
            immediateRender:false,
            stagger:{
                amount:0.5,
                each:0.2,
                from:2
            },
            ease:"power2.inOut"
        })
   },[boxRef ])

   const addToRef = (box)=>{
            boxRef.current.push(box);
   }



    return ( 
        <>
        <div className="loader">
            <div className="inner-loader">
                <p>Loading</p>
                <div id="anime-div" ref={addToRef}></div>
               <div id="anime-div1" ref={addToRef}></div>
               <div id="anime-div2" ref={addToRef}></div>
              
            </div>
        </div>
        </>
     );
}
 
export default loadingStatus;