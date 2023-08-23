import './Login.css'
import SignUp from '../components/Signup'
import SignIn from '../components/SignIn'
import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const Login = () => {

const [btnSignInPressed,setBtnSignInPressed] = useState(false);
const [sign,setSign] = useState('SignUp');
const [messageChild, setMessageChild]= useState('');
const [isMessagedRecieved, setIsMessageRecieved] = useState(false);

const handleOpSwitch=()=>{

    setBtnSignInPressed(true)
    setSign('SignIn');

}
const handleProp = (data)=>{
    setMessageChild(data);
    setIsMessageRecieved(true);
    setTimeout(()=>{
       
        setIsMessageRecieved(false);
    },5000)

}

const handleOpSwitchTwo=()=>{

    setBtnSignInPressed(false)
    setSign('SignUp');

}


    return ( 
       <>
    <div className="login-container">
        <nav className='login-nav-bar'>
            <div className='nav1'>
                <p>LOGO.</p>
            </div>
            <div className='nav2'>
               <Link to='/home'>Home</Link>
               <a href="#">Blog</a>
               <a href="#">Services</a>
               <a href="#">About</a>
            </div>
            <div className='nav3'>
                <button onClick={handleOpSwitch}>Sign In</button>
                <button id='signIn' onClick={handleOpSwitchTwo}>Sign Up</button>
            </div>   
        </nav>
        {isMessagedRecieved &&
            <div className="errorMessage">
                    {messageChild} 
             </div> 
             }
          
        <div className='centered-div'>
              
            <div id='div1'>
                <div id='o-div1'>
                    <p>Have an account?. <a href="#">Login</a></p>
                </div>
                <div id='i-div1'>
                    <p>{sign}</p>
                </div>
            </div>
            {btnSignInPressed?<SignIn signInMessage={handleProp} />:<SignUp signUpMessage={handleProp}/>}
        </div>

    </div>
       </>
     );
}
 
export default Login;