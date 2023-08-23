import { useState } from 'react';
import './RoomUpdateModal.css'

const roomEditModal= ({values,modalState,updateMessage,updateStatus}) => {

    const[roomNumber,setRoomNumber]= useState(values[1]);
    const[roomAvailability,setAvaliability]= useState(values[2]);
    const[price,setPrice]= useState(values[4]);
    const[bedType,setBedType]= useState(values[5]);
    const[cleanStatus,setCleanStatus]= useState(values[3]);
    const[error,setError]=useState({
        roomAvailability:''
    });

    const isAvaliable = true;
    const isNotAvaliable = false;
   


    const handleValidation =()=>{
        let isValid = true;
        const newError = {
            roomAvailability:''
        }
         if(roomAvailability !== 'true' && roomAvailability!== 'false'){
            newError.roomAvailability = " Room avaliability is required";
            isValid = false;
        }
        setError(newError);
        return isValid;
    
    }
    
    const handleEditSubmit = async (e)=>{
        e.preventDefault();
        if(handleValidation()){
            const roomEditObj = {roomNumber,
           roomAvailability,
            price,
            bedType,
            cleanStatus}

            modalState(prev=>!prev)

            try{
                const waiting =  await fetch(`http://localhost:9020/homepage/rooms/updateRoomStatus?roomNumber=${roomEditObj.roomNumber}`,{
                  method:'PUT',
                  headers:{'Content-Type':'application/json'},
                  body: JSON.stringify(roomEditObj) 
                })
                const response = await waiting.json();
              
                if(response.status ===200){
                   const message = response.message;
                   const status = response.status;
                   updateMessage(message);
                   updateStatus(status);
                  
                   console.log('Status is: '+status);
                   console.log("Message is :" + message)
               
                } 
                       

            }catch(error){
                console.log(error);
            }
        }
        

    }

    const handleCancel= ()=>{
        modalState(prev=>!prev);
    }

    return ( 
        <>
        <div className="rmodal-container">
          
                <div id='center'>
                    <div className='title-div-text'>
                                <p>Edit Room</p>
                                <div className="cancel" onClick={handleCancel}>X</div>

                    </div>
                    <div className='body-div'>
                        <form action="#" onSubmit={handleEditSubmit}>
                            <div className='each-box'>
                                <span className='texts'>Room Number:</span>
                                <input type="text" className='text-input' value={roomNumber} onChange={(e)=>setRoomNumber(e.target.value)}/>
                            </div>
                                <div className='each-box'>
                                <span className='texts'>Avalibility:</span>

                                 <select name = "dropdown" onChange={(e)=>setAvaliability(e.target.value)} required>
                                     <option value = "null" >Select below</option>
                                    <option value = {isAvaliable} >Avaliable</option>
                                    <option value = {isNotAvaliable}>Not Avaliable</option>
                                 </select>
                                 {error.roomAvailability && <div className='roomava-div'>{error.roomAvailability}</div>}
                            </div>
                            <div className='each-box'>
                                <span className='texts'>Price:</span>
                                <input type="text" className='text-input' value={price} onChange={(e)=>setPrice(e.target.value)} />
                            </div>
                            <div className='each-box'>
                                <span className='texts'>Bedtype:</span>
                               
                                 <select name = "dropdown" onChange={(e)=>setBedType(e.target.value)}>
                                     <option value = "null" >Select below</option>
                                    <option value = "King" >King</option>
                                    <option value ='Queen'  >Queen</option>
                                    <option value = 'Full_Double' >Full Double</option>
                                    <option value = 'Mini_Double' >Mini Double</option>
                                 </select>
                            </div>
                            <div className='each-box'>
                                <span className='texts'>CleanStatus:</span>
                               
                                 <select name = "dropdown" onChange={(e)=>setCleanStatus(e.target.value)}>
                                     <option value = "null" >Select below</option>
                                    <option value = 'Not_Cleaned' >Not Cleaned</option>
                                    <option value = 'Cleaned'>Cleaned</option>
                                 </select>
                            </div>

                            <input type="submit" value="Edit Room" className='room-btn' />
                        </form>
                        

                    </div>
                </div>

           
        </div>
        </>
     );
}
 
export default roomEditModal;