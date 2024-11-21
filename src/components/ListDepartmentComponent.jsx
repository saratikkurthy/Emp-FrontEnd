import React, { useEffect, useState, FunctionComponent } from 'react'
import { getDepartment, updateDepartment } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function ListDepartmentComponent (){
    function addNewDepartment() {
        getDepartment();
        navigator('/add-department')
      }
    const [rowData, setRowData] = useState([]);
    const navigator = useNavigate();
    const ButtonRenderer = (props) => {
        return (
          <div>
            <button className='btn btn-info' onClick={() => props.onClick(props.data)}>Update</button>
          </div>
        );
      };
    useEffect(() => {
        // Fetch data from your API endpoint
        fetch('http://192.168.1.139:8080/departments')
          .then(response => response.json())
          .then(data => setRowData(data));
      }, []);
    
      const columnDefs = [
        { field: 'deptNo', headerName: 'ID' ,filter: 'agTextColumnFilter' },
        { field: 'deptName', headerName: 'Department Name', editable: true, filter: 'agTextColumnFilter' },
        {
          headerName: 'Action',
          cellRenderer: ButtonRenderer,
          cellRendererParams: {
            onClick: (data) => {
              console.log('Button clicked for:', data);
              if (confirm("Are you sure to update?")) {

                updateDepartment(data);
              }
              else{
                alert("Update Cancelled")
              }
            }
          },
    
    
        }
    
      ];
    
  
  return (
    <div className="ag-theme-alpine" style={{ height: 525, width: 600 }}>
         <button type="button" class="btn btn-primary" onClick={addNewDepartment}>Add Department</button>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        
      />
    </div>
  )
}

export default ListDepartmentComponent