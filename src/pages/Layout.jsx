import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeDisplay from "../components/employee/Employee";
import CreateEmployeeDisplay from '../components/employee/CreateEmployee'
import './Layout.css'
import CreateRoom from '../components/room/CreateRoom'
import RoomDisplay from '../components/room/Room'
const Layout = ({children}) => {
    return ( 
        <>
        <div className="home-container">
            <div>
                <Sidebar/>
            </div>
            <div className="second-container-div">
            <Navbar/>
            {children}

            {/* <div className="content">{children}</div> */}
            {/* <CreateEmployeeDisplay/>*/}
            {/* <EmployeeDisplay/> */}
            {/* <CreateRoom/> */}
            
           
            </div>
        </div>
        </>
     );
}
 
export default Layout;