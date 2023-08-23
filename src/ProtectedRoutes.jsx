import React from "react";
import { Route,Redirect } from "react-router-dom/cjs/react-router-dom.min";

const ProtectedRoute = ({component:Component, ...rest}) => {

    const isAuth = localStorage.getItem('jwtToken') !== null;

    return (
       <Route {...rest} render={(props)=>{
        if(isAuth){
            return <Component {...props}/>
        }else{
          return  <Redirect to={'/login'}/>
        }
       }}/>
     );
}
 
export default ProtectedRoute;