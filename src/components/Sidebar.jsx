import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel,faHouse,faUsers,faDoorOpen,faBell,faListCheck} from '@fortawesome/free-solid-svg-icons';

import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'



const Sidebar = () => {

    const[clickedEmployee,setEmployeeClicked]= useState(false);
    const[clickedRoom,setRoomClicked]= useState(false);
    const[profilePic,setProfilePic] = useState('');
    const[username,setUsername]= useState('');
    const[clickedArea,setClickedArea] = useState('');


useEffect(()=>{
      const picFetch = async ()=>{
      try{
        const response = await fetch('https://randomuser.me/api/',{
          method:'GET',
          headers:{'Content-Type':'application/json'}
        })
        const jsonResponse = await response.json();
        const profileObj = jsonResponse.results[0];
        const pic = profileObj.picture;
        const picUrl = pic.medium;
        setProfilePic(picUrl);
        const user= localStorage.getItem('username');
        const capitalUser = user.toUpperCase();
        setUsername(capitalUser);

      }catch (error){
          console.log(error);
      }
  };
  picFetch();
},[])


  const divStyle = {
        backgroundImage: `url(${profilePic})`,
    };

  

    const handleEmployeeClick= ()=>{
            setEmployeeClicked(prev=>!prev);
            setRoomClicked((prev)=> prev === true ? false : null);
            setClickedArea('employees')
            console.log('Employee Clicked')
    }
    

    const handleRoomClick= ()=>{
            setRoomClicked(prev=>!prev);
            setEmployeeClicked((prev)=> prev === true ? false : null)
            setClickedArea('room')
            console.log('Room Clicked')
    }
    return ( 
        <div className="sidebar">
            <div className="logoDiv">
                <div className='icon-div'>
                 <FontAwesomeIcon icon={faHotel} size='2x'/>
                </div>
                <div className='name-div'>
                    <p>BLISS Hotel</p>
                </div>
            
            </div>

            <div className='menuContainer'>
                <div className='menuWrapper'>
                    <div onClick={()=>{
                      setClickedArea('home')
                       setRoomClicked((prev)=> prev === true ? false : null);
                       setEmployeeClicked((prev)=> prev === true ? false : null)

                      }}  className={clickedArea === 'home'? "taskDivClicked":"taskDiv"}>
                      <div className='innerTask'>
                        <FontAwesomeIcon icon={faHouse} />
                      </div>
                      <p ><Link className='one-click' to="/home">Home</Link></p>  
                      
                   </div>
                   
                </div>
                <div className='menuWrapper'>
                   <div  className={clickedArea === 'employees'? "employeeDivClicked":"employeeDiv"}  onClick={handleEmployeeClick}>
                        <div className='innerTask'>
                          <FontAwesomeIcon icon={faUsers}/>
                          </div>
                        <p>Employees</p>
                    </div>
                     {clickedEmployee && 
                        (
                          <>
                            <div className='clicked'>
                                    <p className='on-click'><Link to="/createEmployee" className='one-click'>Create Employee</Link></p>
                            </div>
                            <div className='clicked'>
                                    <p className='on-click'><Link to="/viewEmployees" className='one-click'>View All Employees</Link></p>
                            </div>
                            <div className='clicked'>
                                  
                            </div>
                          </>

                        )
                      }
                </div>
                <div className='menuWrapper'>
                    <div className={clickedArea === 'room'? "roomDivClicked":"roomDiv"} onClick={handleRoomClick}>
                       <div className='innerTask'>
                        <FontAwesomeIcon icon={faDoorOpen}/>
                       </div>
                       <p>Rooms</p>

                    </div>
                     {clickedRoom && 
                        (
                          <>
                            <div className='clicked'>
                                <p className='on-click'><Link className='one-click' to="/createRoom">Create Room</Link></p>
                            </div>
                            <div className='clicked'>
                                <p className='on-click'><Link className='one-click' to="/viewRooms">View All Room</Link></p>
                            </div>
                            <div className='clicked'>

                            </div>
                          </>

                        )
                      }
                </div>
                <div className='menuWrapper'>
                    <div className="notificationDiv">
                       <div className='innerTask'>
                          <FontAwesomeIcon icon={faBell}/>
                       </div>
                       <p>Notifications</p>

                    </div>
                </div>
                <div className='menuWrapper'>
                    <div className="serviceDiv">
                      <div className='innerTask'>
                          <FontAwesomeIcon icon={faListCheck} />
                      </div>
                      <p>Tasklist</p>
                    </div>
                </div>
            </div>

            <div className="profileDiv">
                <div id='pPic' style={divStyle}>
                   
                </div>
                <div id='ePic'>
                     <p>Welcome back {username}</p>
                </div>

            </div>
        </div>
     );
}
 
export default Sidebar;