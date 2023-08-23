import './SignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faLock,faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Signup = ({signUpMessage}) => {

    const [username,setFirstname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const history = useHistory();
    const [message,setMessage]= useState('');
    const [fail,setFail] = useState(false);
    const [error, setError] = useState({
        username:'',
        email:'',
        password:''
    });


 const handleValidation = ()=>{
        let isValid = true;
        const newError ={
            username:'',
            email:'',
            password:''
        }
        if(username.trim() === ""){
            newError.username = "Username is required";
            isValid = false;
        }
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailPattern.test(email)){
            newError.email = "Invalid Email Pattern";
            isValid= false;
        }
        if(password.trim() === ""){
            newError.password = "Password is required";
            isValid = false;
        }
        setError(newError);
        return isValid;

    }

   /* const handleInputChange = (e)=>{
            const [name,value]= e.target;
          setFormData((prevData)=>{
            ({...prevData})
          })
    }*/



const handleCreateEmployee= async (e)=>{
    e.preventDefault();
    if(handleValidation()){
         const employeeSignUpObj = {
            username,
            email,
            password};
    console.log(`Signup Obj:${employeeSignUpObj}`);

    try{
        const response = await fetch(`http://localhost:9020/home/signup?email=${email}`,{
                        method:"PUT",
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify(employeeSignUpObj)})

        const responseJson = await response.json();
        if(responseJson.successful === false){
            setFail(true);
            const message = responseJson.data;
            console.log(responseJson.data);
            signUpMessage(message);
        }else{
            console.log(responseJson)
            //history.push('/Login')
            signUpMessage(responseJson.message);

        }
       

    }catch(error){
        console.log(error);
    }
}
   
        
    

}


    return ( 
        <>
          <form onSubmit={handleCreateEmployee}>
            <div className='div2'>
                <div className='i-div2'>
                    <div id='icon-div'>
                          <FontAwesomeIcon icon={faUser} size='lg'/>
                    </div>
                    <input type="text" placeholder='Username' id='fname' value={username} onChange={(e)=>setFirstname(e.target.value)} />
                </div>
                 {error.username && <div className='error-user'>{error.username}</div>}
               

            </div>
            <div className='div3'>
                <div className='contain-len'>
                 <div id='email-div'>
                    <div id='icon-div3'>
                    <FontAwesomeIcon icon={faEnvelope} size='lg'/>
                    </div>
                    <input type="text" placeholder='Email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>   
                 </div>
                 {error.email && <div className='error-user'>{error.email}</div>}
                </div>
                <div className="contain-len">
                     <div id='pass-div'>
                    <div id='icon-div4'>
                    <FontAwesomeIcon icon={faLock} size='lg' beat/>
                    </div>
                    <input type="text" placeholder='Password' id='pass' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                {error.password && <div className='error-user'>{error.password}</div>}
                </div>
               <div className="contain-len">
                    <button id='sub-btn'>SignUp</button>
                    <div className='div'>
                    <div id='inner-d'>
                        <input type="checkbox" name="check" id="CB" />
                        Remember me
                    </div>
                   
                </div>
               </div>
                
            </div>
            <div className='div4'>

            </div>
            </form>
        </>
     );
}
 
export default Signup;