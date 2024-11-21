import React,{useEffect, useState} from 'react'
import { createEmployee,getEmployee,updateEmployee } from '../services/EmployeeService'
import { useNavigate,useParams } from 'react-router-dom'

const EmployeeComponent = () => {
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
    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleBirthDate = (e) => {
        setBirthDate(e.target.value)
    }
    const handleGender = (e) => {
        setGender(e.target.value)
    }
    const handleHireDate =(e) =>  {
        setHireDate(e.target.value)
        setDeleted(0)
        
    }
    const handleDeleted =(e) => {
        setDeleted(1)
    }
    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setGender(response.data.gender)
                setBirthDate(response.data.birthDate)
                setHireDate(response.data.hireDate)
                setDeleted(response.data.deleted)
                setEmpNo(response.data.empNo)
                
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
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    function saveEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee={empNo,firstName,lastName,birthDate,hireDate,gender,deleted}
            console.log(employee)
            if(id){
                updateEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                    window.location.reload();
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
                
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                    window.location.reload();
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
        
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}
        if(firstName.trim()){
            errorsCopy.firstName = '';
        }
        else{
            errorsCopy.firstName = 'First Name Required';
            valid = false;
        }
        if(lastName.trim()){
            errorsCopy.lastName = '';
        }
        else{
            errorsCopy.lastName = 'Last Name Required';
            valid = false;
        }
        if(hireDate.trim()){
            errorsCopy.hireDate = '';
        }
        else{
            errorsCopy.hireDate = 'Hire Date Required';
            valid = false;
        }
        if(birthDate.trim()){
            errorsCopy.birthDate = '';
        }
        else{
            errorsCopy.birthDate = 'Birth Date Required';
            valid = false;
        }
        if(gender.trim()){
            errorsCopy.gender = '';
        }
        else{
            errorsCopy.gender = 'Gender Required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
        
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
                        <div className='form-group mb-2'>
                            <label className='form-lable'>First Name:</label>
                            <input type='text' 
                            placeholder='Enter Employee First Name' 
                            name='firstName' 
                            value={firstName} 
                            className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                            onChange={handleFirstName}></input>
                            { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div> }

                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'>Last Name:</label>
                            <input type='text' 
                            placeholder='Enter Employee Last Name' 
                            name='lastName' 
                            value={lastName} 
                            className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
                            onChange={handleLastName}></input>
                            { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'>Birth Date:</label>
                            <input type='text' 
                            placeholder='Enter Employee Birth Date' 
                            name='birthDate' 
                            value={birthDate} 
                            className={`form-control ${ errors.birthDate ? 'is-invalid': '' }`}
                            onChange={handleBirthDate}></input>
                            { errors.birthDate && <div className='invalid-feedback'> { errors.birthDate} </div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'>Gender:</label>
                            <input type='text' 
                            placeholder='Enter Employee Gender' 
                            name='gender' 
                            value={gender} 
                            className={`form-control ${ errors.gender ? 'is-invalid': '' }`}
                            onChange={handleGender}></input>
                            { errors.gender && <div className='invalid-feedback'> { errors.gender} </div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'>Hire Date:</label>
                            <input type='text' 
                            placeholder='Enter Employee Hire Date' 
                            name='hireDate' 
                            value={hireDate} 
                            className={`form-control ${ errors.hireDate ? 'is-invalid': '' }`}
                            onChange={handleHireDate}></input>
                            { errors.hireDate && <div className='invalid-feedback'> { errors.hireDate} </div> }
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button className='btn btn-success' onClick={saveEmployee} >Submit</button>
                        <button className='btn btn-secondary' onClick={cancelEmployee} >Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent