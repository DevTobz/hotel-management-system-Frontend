import './Employee.css'
import { useTable } from 'react-table';
import { useMemo,useState,useEffect } from 'react';
import EditModal from './EmployeeEditModal'
import DeleteModal from './EmployeeDeleteModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';
import LoadingStatus from '../LoadingStatus';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';


const Employee = () => {
  const[employeeCount,setEmployeeCount] = useState();
  const[isEMOpen, setEMOpen] = useState(false);
  const[rowValues,setRowValues] = useState([]);
  const[employeeEmail,setEmployeeEmail] = useState('');
  const[isEDOpen, setEDOpen] = useState(false);
  const[tableData,setTableData] = useState([]);
  const[isLoading,setIsLoading] = useState(true);
  const[editMessage, setEditMessage] = useState('');
  const[editStatus, setEditStatus] = useState(false);
  const[messageTimer, setMessageTimer] = useState(false);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
         const response = await fetch('http://localhost:9020/homepage/employee/getAllEmployee',{
          method:"GET",
          headers:{'Content-Type':'application/json'}

      });

            if(response.ok){
                const jsonData = await response.json();
                console.log(jsonData.data)
                setTableData(jsonData.data);
                setIsLoading(false);
            }
     }catch(error){
          console.log(error);
    }
      
    };
    fetchData();
  },[])


  const data = useMemo(()=> tableData,[tableData]);
  const columns = useMemo(()=>[{
      Header:"ID",
      accessor:"id"
     },
     {
      Header:"Firstname",
      accessor:"firstName"
     },
      {
      Header:"Lastname",
      accessor:"lastName"
     },
      {
      Header:"Age",
      accessor:"age"
     },
      {
      Header:"Gender",
      accessor:"gender"
     },
      {
      Header:"Role",
      accessor:"role"
     },
      {
      Header:"PhoneNumber",
      accessor:"phoneNumber"
     },
      {
      Header:"Email",
      accessor:"email"
     },
    {
       id: 'Edit', 
      Header: 'Actions',
      Cell: ({row}) => (
        <>
         <button onClick={()=>handleEdit(row)}>
           <FontAwesomeIcon icon={faPenToSquare}/>
        </button>
        <button onClick={()=>handleDelete(row)}>
            <FontAwesomeIcon icon={faTrash} />
        </button>
        </>
       
      )
    },
  ],[]);


  useEffect(()=>{
    setEmployeeCount(tableData.length);
  },[tableData])

const handleEdit = (row)=>{
        const values = row.cells.map(cell=>cell.value)
        console.log('The values of employees are:'+ values[7])
        const email = values[7];
        setEMOpen(prev=>!prev);
        setRowValues([...values]);
   
      
}
const handleDelete = (row)=>{
      const values = row.cells.map(cell=>cell.value)
      const email = values[7];
      setEmployeeEmail(email);
      setEDOpen(prev=>!prev);
   
}


const handleDone = (data)=>{
  if(data === 200){
    setEditStatus(true);
    

    setTimeout(()=>{
      setEditStatus(false);
      setEditMessage('');

    },5000)
  }

}
const handleMessage = (data)=>{
    setEditMessage(data);
}

const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow }= useTable({data,columns} )





    return ( 
      <>
        {isLoading ? (<LoadingStatus/>): 
           <div className="employee-container">
            <div id='count-div'>
              <div id='c1'>
                <h1>EMPLOYEES</h1>
                <h6>This table shows employee found in the database</h6>
              </div>
               {editStatus &&  <div className="roomupdate">{editMessage}</div>}
              <div id='c2'>
                {/* This place will take a state of all counting numbers of employees */}
                <p className='count-text'>{employeeCount}</p><br /> 
                <p className='normal-text'>employees found</p>
              </div>
            </div>
            {isEMOpen && (<EditModal values={rowValues} modalState={setEMOpen} editMessage={handleMessage} isEditDone={handleDone}/>)}
            {isEDOpen && (<DeleteModal email={employeeEmail} deleteModalState={setEDOpen} setEmail={setEmployeeEmail}/>) }
            <div id='employee-table'>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column)=>(
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                      ))}

                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row)=>{
                    prepareRow(row);
                     return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell)=> (
                          <td {...cell.getCellProps()}>
                            {cell.render( "Cell")}

                          </td>
                        ))}

                      </tr>
                     )
                  })}

                </tbody>
              </table>
            </div>
        </div>
        
        }
           
      </>
  
     );
}
 
export default withRouter(Employee);