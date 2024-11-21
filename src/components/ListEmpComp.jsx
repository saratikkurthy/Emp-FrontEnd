import React, { useEffect, useState } from 'react'
import { getEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import PagingComponent from './PagingComponent'


const ListEmpComp = () => {
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        listEmployees.then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentData = employees.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    function addNewEmployee() {
        getEmployee();
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        getEmployee();
        navigator(`/edit-employee/${id}`)

    }

    function removeEmployee(id) {
        console.log("Employee ID:" + id)
        getEmployee(id);
        navigator(`/delete-employee/${id}`)
    }


    return (

        <div className='container'>
            <button type="button" class="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
            <br></br>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Birth Day</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>{
                    currentData.map(empployee =>
                        <tr key={empployee.empNo}>
                            <td>{empployee.empNo}</td>
                            <td>{empployee.firstName}</td>
                            <td>{empployee.lastName}</td>
                            <td>{empployee.gender}</td>
                            <td>{empployee.birthDate}</td>
                            <td>
                                <button className='btn btn-info'
                                    onClick={() => updateEmployee(empployee.empNo)}>Update</button>
                                &nbsp;
                                <button className='btn btn-danger'
                                    onClick={() => removeEmployee(empployee.empNo)}>Delete</button>
                            </td>
                        </tr>)
                }
                    <PagingComponent
                        itemsPerPage={itemsPerPage}
                        totalItems={employees.length}
                        onPageChange={handlePageChange}
                    />
                </tbody>
            </table>
        </div>

    )
}

export default ListEmpComp