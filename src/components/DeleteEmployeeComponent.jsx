import { deleteEmployee ,getEmployee} from "../services/EmployeeService";
import React,{useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
const DeleteEmployeeComponent = () => {
    const [empNo,setEmpNo] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [birthDate,setBirthDate] = useState('')
    const [gender,setGender] = useState('')
    const [hireDate,setHireDate] = useState('')
    const [deleted,setDeleted] = useState('')
    const [errors,setErrors] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        hireDate: '',
        deleted: ''
    })
    const {id} = useParams();
    
    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setGender(response.data.gender);
                setBirthDate(response.data.birthDate);
                setHireDate(response.data.hireDate);
                setDeleted(response.data.deleted);
                setEmpNo(response.data.empNo);
                setDeleted(1);
                
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])
    
    function cancelEmployee(e){
        navigator('/employees')
    }
    function pageTitle(){
        if(id){
            return <h3 className='text-center'>Delete Employee:{empNo}</h3>
        }
    }
    function removeEmployee(e){
        console.log("Employee Information:")
        navigator('/employees')
        const employee={empNo,firstName,lastName,birthDate,hireDate,gender,deleted}
        console.log(employee)
        
        if(employee.empNo){
            deleteEmployee(employee).then((response) => {
            console.log(response.data);
            window.location.reload();
            navigator('/employees');
            }).catch(error => {
             console.error(error);
             })
           } 
        
    }

    return (
        <div className='container' style={{ width: '900px', height: '400px' ,alignItems: 'center'  }}>
            
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    
                    <div className='card-body'>
                        <form>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button className='btn btn-success' onClick={removeEmployee} >Delete</button>
                        <button className='btn btn-success' onClick={cancelEmployee} >Cancel</button>
                        </div>
                        </form>
                    </div>
    
                </div>
            </div>
        </div>
      )
}

export default DeleteEmployeeComponent