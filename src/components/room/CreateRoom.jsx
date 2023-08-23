import './CreateRoom.css'
import { useState } from 'react';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


const createRoom = () => {

    const[roomNumber,setRoomNumber]= useState('');
    const[roomAvailability,setAvaliability]= useState('');
    const[price,setPrice]= useState('');
    const[bedType,setBedType]= useState('');
    const[isCreated,setIsCreated] = useState(false);
    const[message,setMessage] = useState('');
    const isAvaliable = true;
    const isNotAvaliable = false;
    const [error, setError] = useState({
        roomNumber:'',
        roomAvailability:'',
        price:'',
        bedType:''
    });

     const handleValidation = ()=>{
        let isValid = true;
        const newError ={
            roomNumber:'',
            roomAvailability:'',
            price:'',
            bedType:''
        }
        if(roomNumber.trim() === ""){
            newError.roomNumber = "Roomnumber is required";
            isValid = false;
        }
        if(roomAvailability.trim() === ""){
            newError.roomAvailability = " Room avaliability is required";
            isValid = false;
        }
       
        
         if(price.trim() === ""){
            newError.price = "Price is required";
            isValid = false;
        }
         if(bedType.trim() === ""){
            newError.bedType= "Bed Type is required";
            isValid = false;
        }
       
        
        setError(newError);
        return isValid;

    }
    
    const handleCreateSubmit = async (e)=>{
    
        e.preventDefault();
        if(handleValidation()){
            const createRoomObj={
            roomNumber,
            roomAvailability,
            price,
            bedType
        }
        console.log(createRoomObj);
        try{
           const response = await fetch('http://localhost:9020/homepage/rooms/addRoom',{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(createRoomObj)
            })

            const  responseJson = await response.json();
            if(responseJson.status  === 201){
                setMessage(responseJson.data);
                setIsCreated(true);
                setTimeout(()=>{
                    setMessage('');
                    setIsCreated(false);
                },5000)
            }

        }catch(err){
            console.log(err);

        }

    }
        
        
    }
    return ( 
        <>
        <div className="createContainer-room">
            <div className="inner-room">
                <div id='center'>
                    <div className='title-div-text'>
                        Create Room
                    </div>
                    <div className='body-div'>
                        <form action="#" onSubmit={handleCreateSubmit}>
                            <div className='each-box'>
                                <span className='texts'>Room Number:</span>
                                <input type="text" className='text-input' value={roomNumber} onChange={(e)=> setRoomNumber(e.target.value)}/>
                                {error.roomNumber && <div className='error-emp'>{error.roomNumber}</div>}
                            </div>
                            <div className='each-box'>
                                <span className='texts'>Avalibility:</span>
                          
                                 <select name = "dropdown" onChange={(e)=> setAvaliability(e.target.value)}>
                                    <option value = "null" >Select below</option>
                                    <option value ={isAvaliable}>Avaliable</option>
                                    <option value = {isNotAvaliable}>Not Avaliable</option>
                                 </select>
                                 {error.roomAvailability && <div className='error-emp'>{error.roomAvailability}</div>}
                            </div>
                            <div className='each-box'>
                                <span className='texts'>Price:</span>
                                <input type="text" className='text-input' value={price} onChange={(e)=> setPrice(e.target.value)}/>
                                {error.price && <div className='error-emp'>{error.price}</div>}
                            </div>
                            <div className='each-box'>
                                <span className='texts'>Bedtype:</span>
             
                                 <select name = "dropdown" onChange={(e)=> setBedType(e.target.value)}>
                                    <option value = "null" >Select below</option>
                                    <option value = "King">King</option>
                                    <option value = "Queen">Queen</option>
                                    <option value = "Full_Double">Full Double</option>
                                    <option value = "Mini_Double">Mini Double</option>
                                 </select>
                                 {error.bedType && <div className='error-emp'>{error.bedType}</div>}
                            </div>

                           <button className='room-btn'>
                                Create Room
                           </button>

                        </form>
                        

                    </div>
                </div>
                <div className='playing-div'>
                    {message}
                </div>
            </div>
        </div>
        </>
     );
} 
 
export default withRouter(createRoom);