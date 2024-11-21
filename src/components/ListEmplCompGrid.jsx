import React, { useEffect, useState, FunctionComponent } from 'react'
import { getEmployee, listEmployees, updateEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import PagingComponent from './PagingComponent'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ConfirmationPopup from './ConfirmationPopup';

function ListEmpCompGrid() {
  const [rowData, setRowData] = useState([]);
  const navigator = useNavigate();
  function addNewEmployee() {
    getEmployee();
    navigator('/add-employee')
  }

  function update(data) {
    console.log("New Data:" + data)
  }
  const onDelete = () => {
    // Handle delete action
    alert("Deleting record")
    console.log('Delete row:');
  };

  const handleConfirmUpdate = () => {
    setShowPopup(false);
  };

  const handleCancelUpdate = () => {
    setShowPopup(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const ButtonRenderer = (props) => {
    return (
      <div>
        <button className='btn btn-info' onClick={() => props.onClick(props.data)}>Update</button>
      </div>
    );
  };
  function refreshSpecificCells() {
    const gridApi = gridRef.current.api;
    gridApi.refreshCells({ force: true }); // Force a full refresh
  }
  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://192.168.1.139:8080/employees/findActive')
      .then(response => response.json())
      .then(data => setRowData(data));
  }, []);



  const columnDefs = [
    { field: 'empNo', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name', editable: true, filter: 'agTextColumnFilter' },
    { field: 'lastName', headerName: 'Last Name', editable: true, filter: 'agTextColumnFilter' },
    { field: 'gender', headerName: 'Gender', editable: true, filter: 'agTextColumnFilter' },
    { field: 'birthDate', headerName: 'Birth Date', editable: true , filter: 'agTextColumnFilter'},
    {
      headerName: 'Action',
      cellRenderer: ButtonRenderer,
      cellRendererParams: {
        onClick: (data) => {
          console.log('Button clicked for:', data);
          if (confirm("Are you sure to update?")) {
          updateEmployee(data)
          alert("Updated Suceessfully")
          }
          else{
            alert("Update Cancelled")
            refreshSpecificCells();
          }
          
        }
      },


    }

  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 525, width: 1110 }}>
      <button type="button" class="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        
      />
    </div>
  );
}

export default ListEmpCompGrid