import { useState } from 'react';
import './EmployeeDelete.css'

const employeeDeleteModal = ({email,deleteModalState,setEmail}) => {

    

    const handlePositiveClick= async ()=>{
        setEmail(email);
         deleteModalState(prev=>!prev);
        console.log(email);

        try{
            const response = await fetch(`http://localhost:9020/homepage/employee/deleteEmployee?email=${email}`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}})
            
            const jsonResponse = response.json();
            console.log(jsonResponse);
        }catch(error){
            console.log(error);
        }
       
    }
    const handleNegativeClick=()=>{
        deleteModalState(prev=>!prev);
    }
    const handleCancel=()=>{
        deleteModalState(prev=>!prev);
    }
    return ( 



        <>
        <div className='dmodal-container'>
            <div className='delete-inner'>
                <span onClick={handleCancel}>X</span>
                <div className='view-div'>
                    <p>ARE SURE YOU WANT TO DELETE THE EMPLOYEE?.</p>
                    <div className='last-div'>
                        <button id='bt1' onClick={handleNegativeClick}>No</button>
                        <button id='bt2' onClick={handlePositiveClick}>Yes</button>
                    </div>

                </div>

            </div>

        </div>
        </>
     );
}
 
export default employeeDeleteModal;