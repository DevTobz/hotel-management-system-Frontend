import './Room.css'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useState,useMemo, useEffect} from 'react';

import { useTable } from 'react-table';
import EditModal from './RoomEditModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';
import LoadingStatus from '../LoadingStatus';

const Room = () => {
    const[isRMOpen, setRMOpen] = useState(false);
    const[rowValues,setRowValues] = useState([]);
    const[roomCount,setRoomCount] = useState([]);
    const[tableData, setTableData] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const[updateMessage, setUpdateMessage] = useState('');
    const[updateStatus, setUpdateStatus] = useState(false);


    const handleStatus =(data)=>{
      console.log(data);
      if(data === 200){
        setUpdateStatus(true);
        setTimeout(()=>{
            setUpdateMessage("");
            setUpdateStatus(false);
        },5000)
        
      }
    }

    const handleMessage =(data)=>{
      console.log(data);
      setUpdateMessage(data);
     
    }

    useEffect(()=>{
      const fetchData = async ()=>{
        try{
          const response = await fetch('http://localhost:9020/homepage/rooms/viewAllRooms',{
            method:'GET',
            headers:{'Content-Type':'application/json'}
          })

          const data = await response.json();
          const objArray = data.data;
          setTableData(objArray);
          console.log(objArray);
          setIsLoading(false);
        }catch(err){
              console.log(err);
        }
            
      }

      fetchData();
    },[])
 

    const data = useMemo(()=> tableData,[tableData]);
    const columns = useMemo(()=>[{
      Header:"ID",
      accessor:"id"
     },
     {
      Header:"RoomNumber",
      accessor:"roomNumber"
     },
      {
      Header:"Availability",
      accessor:"availabilityStatus"
     },
      {
      Header:"CleanStatus",
      accessor:"cleanStatus"
     },
      {
      Header:"Price",
      accessor:"price"
     },
      {
      Header:"BedType",
      accessor:"bedType"
     },
    {
       id: 'Edit', // Add an id for the custom column
      Header: 'Actions',
      Cell: ({row}) => (
        <>
         <button onClick={()=>handleEdit(row)}>
          <FontAwesomeIcon icon={faPenToSquare}/>
        </button>
        </>
       
      )
    },
  ],[]);

 useEffect(()=>{

  setRoomCount(tableData.length);

 },[tableData])


const handleEdit = (row)=>{
        const values = row.cells.map(cell=>cell.value)
        console.log(values);
        const id = values[0];
        setRMOpen(prev=>!prev);
        setRowValues([...values]);
   
      
}











    const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow }= useTable({data,columns} );

    return (
        <>
        {isLoading ? (<LoadingStatus/>):(
            <div className="room-container">
              
            <div id='rcount-div'>
              <div id='r1'>
                <h1>ROOM</h1>
                <h6>All Rooms are present in the directory</h6>
              </div>
             {updateStatus &&  <div className="roomupdate">{updateMessage}</div>}
              <div id='r2'>
                {/* This place will take a state of all counting numbers of Room*/}
                 <p className='rcount-text'>{roomCount}</p><br /> 
                <p className='rnormal-text'>rooms found</p>
              </div>
            </div>
            {isRMOpen && (<EditModal values={rowValues} modalState={setRMOpen} updateMessage={handleMessage} updateStatus={handleStatus}/>)}
           
            <div id='room-table'>
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
        )}
        
        
        </>
      );
}
 
export default withRouter(Room);