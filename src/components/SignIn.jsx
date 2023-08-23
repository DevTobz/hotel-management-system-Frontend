import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faLock,faUser } from '@fortawesome/free-solid-svg-icons';
import './SignIn.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const signIn = ({signInMessage}) => {

    const [username,setUsername]= useState('');
    const [password,setPassWord] = useState('');
    const [opModal, setOpModal] = useState(false);
    const [fail,setFail] = useState(false);
   
    const history = useHistory();
    const [error, setError] = useState({
        username:'',
        email:'',
        password:''
    });


 const handleValidation = ()=>{
        let isValid = true;
        const newError ={
            username:'',
            password:''
        }
        if(username.trim() === ""){
            newError.username = "Username is required";
            isValid = false;
        }
        if(password.trim() === ""){
            newError.password = "Password is required";
            isValid = false;
        }
        setError(newError);
        return isValid;

    }

    const handleSignIn= async (e)=>{
        e.preventDefault();
        if(handleValidation()){
             const signInObj = {username,password};
        console.log(signInObj);

        try{
            const response = await fetch('http://localhost:9020/home/signIn',{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(signInObj) })

            const responseJson = await response.json();
            const jwtToken = responseJson.data;
            
         
          
            if(jwtToken===null){
                    const message= responseJson.message;
                    signInMessage(message);
                    setFail(true);
                    
            }else if(jwtToken.length <= 18){
                    signInMessage(jwtToken);
                    setFail(true);

            }else{
                localStorage.setItem('jwtToken',jwtToken);
                localStorage.setItem('username',username);
                console.log('Token recieved successfully');
                history.push('/');

            }   

        }catch(error){
            console.log(error);
        }
        
    }
        }
       


    return ( 


        <>
        <form onSubmit={(e)=>handleSignIn(e)}>
            <div className='div3'>
                <div className="con-div">
                    <div id='email-div'>
                        <div id='icon-div3'>
                            <FontAwesomeIcon icon={faEnvelope} size='lg'/>
                        </div>
                        <input type="text" placeholder='Username' id='email' value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                     {error.username && <div className='error-sign'>{error.username}</div>}
                </div>
                
                <div className="con-div">
                    <div id='pass-div'>
                        <div id='icon-div4'>
                            <FontAwesomeIcon icon={faLock} size='lg' beat/>
                        </div>
                        <input type="text" placeholder='Password' id='pass' value={password} onChange={(e)=>setPassWord(e.target.value)} />
                    </div>
                     {error.password && <div className='error-sign'>{error.password}</div>}
                </div>
                <div className="con-div">
                     <button id='sub-btn' >SignIn</button>
                </div>
               <div className="con-div">
                    <div className='div'>
                        <div id='inner-d'>
                        <input type="checkbox" name="check" id="CB" />
                            Remember me
                        </div>
                        
                    </div>
                </div>
            </div>
         
            </form>
        </>
     );
}
 
export default signIn;