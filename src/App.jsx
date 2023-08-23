import { useState,useEffect } from 'react'
import ProtectedRoute from './ProtectedRoutes'
import Login from './pages/Login'
import Layout from './pages/Layout'
import ViewAllEmployees from './components/employee/Employee'
import CreateRoom from './components/room/CreateRoom'
import ViewAllRooms from './components/room/Room'
import CreateEmployee from './components/employee/CreateEmployee'
import Home from './components/HomeComponent'
import Loader from './components/LoadingStatus'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom/cjs/react-router-dom.min';



function App() {

  useEffect(() => {
    const clearLocalStorageOnUnload = () => {
      if (!window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
        localStorage.removeItem("jwtToken");
      }
    };

    window.addEventListener("beforeunload", clearLocalStorageOnUnload);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnUnload);
    };
  }, []);

  return (
  
    <Router>
      <Switch>
        <Route path="/Login">
            <Login/>
          </Route>
        
        <Layout>
           {/* <Route exact path="/" component={} /> */}
           <ProtectedRoute exact path="/home" component={Loader} />
           <ProtectedRoute path="/viewEmployees" component={ViewAllEmployees} />
           <ProtectedRoute path='/viewRooms' component={ViewAllRooms} />
           <ProtectedRoute path="/createRoom" component={CreateRoom} />  
           <ProtectedRoute path="/createEmployee" component={CreateEmployee} /> 
         </Layout>
          
         
         
         
      </Switch>
    </Router>
 
    
     
   
  )
}

export default App
