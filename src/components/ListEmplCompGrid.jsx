import React,{useEffect,useState,FunctionComponent} from 'react'
import { getEmployee,listEmployees,updateEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import PagingComponent from './PagingComponent'
import { AgGridReact } from 'ag-grid-react'; 

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function ListEmpCompGrid() {
  const [rowData, setRowData] = useState([]);
  const navigator = useNavigate();
  function addNewEmployee(){
    getEmployee();
    navigator('/add-employee')
  }

  function update(data){
    console.log("New Data:"+data)
  }
  const onDelete = () => {
    // Handle delete action
    alert("Deleting record")
    console.log('Delete row:');
  };

  const ButtonRenderer = (props) => {
    return (
      <div>
      <button onClick={() => props.onClick(props.data)}>Update</button>
      </div>
    );
  };

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://192.168.1.139:8080/employees/findActive')
      .then(response => response.json())
      .then(data => setRowData(data));
  }, []);

  

  const columnDefs = [
    { field: 'empNo', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name' ,editable: true,filter: 'agTextColumnFilter'},
    { field: 'lastName', headerName: 'Last Name',editable: true ,filter: 'agTextColumnFilter'},
    { field: 'gender', headerName: 'Gender',editable: true ,filter: 'agTextColumnFilter'},
    { field: 'birthDate', headerName: 'Birth Date' ,editable: true},
    {
      headerName: 'Action',
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        onClick: (data) => {
          console.log('Button clicked for:', data);

          updateEmployee(data)
          alert("Updated Suceessfully")
        }
      },
      
      
    }
    
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 550, width: 1200 }}>
      <button type="button" class="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
      <AgGridReact 
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
  );
}

export default ListEmpCompGrid