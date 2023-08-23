import './CreateEmployee.css'
import { useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'


const createEmployee = () => {

    const [firstName,setFirstname] = useState('')
    const [lastName,setLastname] = useState('')
    const [age,setAge] = useState('')
    const [role,setRole] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [email,setEmail] = useState('')
    const [gender,setGender] = useState('')
    const[message, setMessage] = useState('')
    const [isCreated,setIsCreated] = useState(false)
    const [error, setError] = useState({
        firstName:'',
        email:'',
        lastName:'',
        age:'',
        role:'',
        phoneNumber:'',
        gender:''
    });

    const handleValidation = ()=>{
        let isValid = true;
        const newError ={
            firstName:'',
            email:'',
            lastName:'',
            age:'',
            role:'',
            phoneNumber:'',
            gender:''
        }
        if(firstName.trim() === ""){
            newError.firstName = "Firstname is required";
            isValid = false;
        }
        if(lastName.trim() === ""){
            newError.lastName = " Lastname is required";
            isValid = false;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailPattern.test(email)){
            newError.email = "Invalid Email Pattern";
            isValid= false;
        }
        
         if(age.trim() === ""){
            newError.age = "Age is required";
            isValid = false;
        }
         if(phoneNumber.trim() === ""){
            newError.phoneNumber= "Phone Number is required";
            isValid = false;
        }
         if(gender.trim() === ""){
            newError.gender= "Gender is required";
            isValid = false;
        }
         if(role.trim() === ""){
            newError.role= "Role is required";
            isValid = false;
        }
        
        setError(newError);
        return isValid;

    }



const handleCreateEmployee=async (e)=>{
    e.preventDefault();
    if(handleValidation()){
           const sendEmployeeCreateObj = {firstName,
                            lastName,
                            age,
                            role,
                            phoneNumber,
                            email,
                            gender}
    console.log(sendEmployeeCreateObj);

    
      try{
         const response = await fetch("http://localhost:9020/homepage/employee/createEmployee",{
         method:'POST',
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(sendEmployeeCreateObj)});

         const responseJson = await response.json();
         if(responseJson.status === 201){
            setMessage(responseJson.message);
            setIsCreated(true);
            setTimeout(()=>{
                setMessage('');
                setIsCreated(false);
            },5000)
         }
   }catch(error){
      console.log(error)
   }
 }
  
     


}

    return ( 
        <>
        <div className="createContainer">
          <div className='inner'>
            {isCreated &&
             <div className="drop-div">
                  {message}
              </div>}
             <div className='title'>
                    <p>Create Employee</p>
             </div>
             <form action="#" onSubmit={handleCreateEmployee}>
                 <div className='user-details'>
                      <div className='capture-div'>
                         <div className='input-box'>
                            <span className='details'>Firstname</span>
                            <input type="text" name="" id="fname-input" placeholder='Enter your firstname' value={firstName} onChange={(e)=>setFirstname(e.target.value)}/>
                              {error.firstName && <div className='error-emp'>{error.firstName}</div>}
                         </div>
                         <div className='input-box'>
                            <span className='details'>Lastname</span>
                            <input type="text" name="" id="Lname-input" placeholder='Enter your lastname' value={lastName} onChange={(e)=>setLastname(e.target.value)}/>
                             {error.lastName && <div className='error-emp'>{error.lastName}</div>}
                          </div>
                      </div>
                      <div className='capture-div'>
                         <div className='input-box'>
                            <span className='details'>Age</span>
                            <input type="text" name="" id="fname-input" placeholder='Enter your age' value={age} onChange={(e)=>setAge(e.target.value)}/>
                             {error.age && <div className='error-emp'>{error.age}</div>}
                         </div>
                          <div className='input-box'>
                              <div className="role-div">
                                    <span className='details'>Role</span>
                                    <select name='dropdown' onChange={(e)=>setRole(e.target.value)}>
                                       <option value="">Select a role</option>
                                       <option value="Manager">Manager</option>
                                       <option value="Receptionist">Receptionist</option>
                                       <option value='Cleaner'>Cleaner</option>
                                       <option value='Security'>Security</option>
                                       <option value='Server'>Server</option>
                                       <option value='Cook'>Cook</option>
                                    </select>
                                     {error.role && <div className='error-emp'>{error.role}</div>}
                              </div>
                            
                          </div>
                     </div>
                      <div className='capture-div'>
                          <div className='input-box'>
                             <span className='details'>Phone Number</span>
                            <input type="text" name="" id="fname-input" placeholder='Enter your phonenumber' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                             {error.phoneNumber && <div className='error-emp'>{error.phoneNumber}</div>}
                          </div>
                          <div className='input-box'>
                            <span className='details'>Email</span>
                            <input type="text" name="" id="Lname-input" placeholder='Enter your email address' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                             {error.email && <div className='error-emp'>{error.email}</div>}
                          </div>
                      </div>
                    </div>
                 <div className='gender-details'>
                    <span className='gender-title'>Gender</span>
                    <div className='radio-div'>
                        <label>Male</label>
                        <input type="radio" id="child" name="gender" value="Male" onChange={(e)=> setGender(e.target.value)}/>

                        <label >Female</label>
                        <input type="radio" id="child" name="gender" value="Female" onChange={(e)=> setGender(e.target.value)}/>

                        <label >Prefer not to say</label>
                        <input type="radio" id="child" name="gender" value="Null" onChange={(e)=> setGender(e.target.value)}/>
                         
                    </div>
                        {error.gender && <div className='error-emp'>{error.gender}</div>}
                 </div>
                 <div className='button '>
                    <input type="submit" value="Register" />
                 </div>
              
                </form>
            </div>
          
        </div>
        </>
     );
}
 
export default withRouter(createEmployee);