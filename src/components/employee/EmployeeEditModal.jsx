import './EmployeeEditModal.css'
import { useState } from 'react'


const employeeEditModal = ({values,modalState,editMessage,isEditDone}) => {
    const [firstName,setFirstName] = useState(values[1]|| '')
    const [lastName,setLastName] = useState(values[2] || '')
    const [age,setAge] = useState(values[3])
    const [role,setRole] = useState(values[5] || '')
    const [phoneNumber,setPhoneNumber] = useState(values[6] || '')
    const [email,setEmail] = useState(values[7] || '')
    const [salary,setSalary] = useState('')

    const handleFirstNameChange = (e)=>{
        setFirstName(e.target.value);
        
    }
    const handleLastnameChange =(e)=>{
        setLastName(e.target.value);
    }
    const handleAgeChange =(e)=>{
        setAge(e.target.value);
    }
    const handleRoleChange =(e)=>{
        setRole(e.target.value);
    }
    const handlePhoneNumberChange =(e)=>{
        setPhoneNumber(e.target.value);
    }
    const handleEmailChange =(e)=>{
        setEmail(e.target.value);
    }
    const handleSalaryChange =(e)=>{
        setSalary(e.target.value);
    }

    //handling updating
    const handleSubmit = async (e)=>{
        e.preventDefault();
           const sendObj = {
            firstName,
            lastName,
            age,
            role,
            phoneNumber,
            email,
            salary}
            try{
                const result =  await fetch(`http://localhost:9020/homepage/employee/editEmployee?email=${sendObj.email}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(sendObj)})
                const jsonResult = await result.json();
                console.log(jsonResult);

                if(jsonResult.status === 200){
                    const message = jsonResult.message;
                    const status = jsonResult.status;
                    editMessage(message);
                    isEditDone(status);
                }
                
            }catch(error){
                console.log(error);
            }
          
 
        //Impliment Api Communitacation here
        modalState(prev=>!prev);

    }
    const handleCancel = ()=>{
        modalState(prev=>!prev);
    }





    return (
        <>
        <div className='modal-container'>
            <div className='m-inner'>
          
             <div className='m-title'>
                    <p>Edit Employee</p>
                    <p className='e-cancel' onClick={handleCancel}>X</p>

             </div>
             <form action="#" >
                 <div className='m-user-details'>
                      <div className='m-capture-div'>
                         <div className='m-input-box'>
                            <span className='m-details'>Firstname:</span>
                            <input type="text" id="m-fname-input" placeholder='Enter your firstname' value={firstName} onChange={(e)=>handleFirstNameChange(e)}/>
                         </div>
                         <div className='m-input-box'>
                            <span className='m-details'>Lastname:</span>
                            <input type="text" name="" id="m-Lname-input" placeholder='Enter your lastname'  value={lastName} onChange={(e)=> handleLastnameChange(e)}/>
                          </div>
                      </div>
                      <div className='m-capture-div'>
                         <div className='m-input-box'>
                            <span className='m-details'>Age:</span>
                            <input type="text" name="" id="fname-input" placeholder='Enter your age' value={age} onChange={(e)=>handleAgeChange(e)} />
                         </div>
                          <div className='m-input-box'>
                            <span className='m-details'>Role:</span>
                            <select name='dropdown' onChange={(e)=>setRole(e.target.value)}>
                                       <option value="">Select a role</option>
                                       <option value="Manager">Manager</option>
                                       <option value="Receptionist">Receptionist</option>
                                       <option value='Cleaner'>Cleaner</option>
                                       <option value='Security'>Security</option>
                                       <option value='Server'>Server</option>
                                       <option value='Cook'>Cook</option>
                            </select>
                          </div>
                     </div>
                      <div className='m-capture-div'>
                          <div className='m-input-box'>
                             <span className='m-details'>Phone Number:</span>
                            <input type="text" name="" id="fname-input" placeholder='Enter your phonenumber' value={phoneNumber} onChange={(e)=>handlePhoneNumberChange(e)} />
                          </div>
                          <div className='m-input-box'>
                            <span className='m-details'>Email:</span>
                            <input type="text" name="" id="Lname-input" placeholder='Enter your email address' value={email} onChange={(e)=>handleEmailChange(e)}/>
                          </div>
                      </div>
                        <div className='m-capture-div'>
                          <div className='m-input-box'>
                             <span className='m-details'>Salary:</span>
                            <input type="text" name="" id="fname-input" placeholder='Enter the salary' value={salary} onChange={(e)=>handleSalaryChange(e)}/>
                          </div>
                      </div>
                    </div>
                        <button type='submit' className='m-submit'onClick={(e)=>handleSubmit(e)} >Submit</button>

                </form>




            </div>


        </div>
        </>
    );
}
 
export default employeeEditModal;