import React,{useEffect, useState} from 'react'
import { getDepartment, updateDepartment } from '../services/EmployeeService'
import { useNavigate,useParams } from 'react-router-dom'

const DepartmentComponent = () => {
    const [deptNo,setDeptNo] = useState('')
    const [deptName,setDeptName] = useState('')
    const [deleted,setDeleted] = useState('')
    const [errors,setErrors] = useState({
        deptNo: '',
        deptName: '',
        deleted: ''
    })
    const {id} = useParams();
    const handleDeptNo = (e) => {
        setDeptNo(e.target.value)
        setDeleted(0)
    }
    
    const handleDeptName = (e) => {
        setDeptName(e.target.value)
        setDeleted(0)
    }

    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getDepartment(id).then((response) => {
                setDeptNo(response.data.deptNo);
                setDeptName(response.data.deptName);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])
    
    function cancelDepartment(e){
        navigator('/departments')
    }
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Department</h2>
        }else{
            return <h2 className='text-center'>Add Department</h2>
        }
    }

    function saveDepartment(e){
        e.preventDefault();

        if(validateForm()){
            const department={deptNo,deptName,deleted}
            console.log(department)
            if(deptNo){
                console.log("Updating Department with ID:"+deptNo)
                updateDepartment(department).then((response) => {
                    console.log(response.data);
                    console.log("After Update department:"+department)
                    navigator('/departments');
                    window.location.reload();
                    navigator('/departments');
                }).catch(error => {
                    console.error(error);
                })
                
            } else {
                updateDepartment(department).then((response) => {
                    console.log(response.data);
                    navigator('/departments')
                    window.location.reload();
                    navigator('/departments');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
        
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}
        if(deptNo.trim()){
            errorsCopy.deptNo = '';
        }
        else{
            errorsCopy.deptNo = 'Department Number Required';
            valid = false;
        }
        if(deptName.trim()){
            errorsCopy.deptName = '';
        }
        else{
            errorsCopy.deptName = 'Department Name Required';
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
                            <label className='form-lable'>Department Number:</label>
                            <input type='text' 
                            placeholder='Enter Department Number' 
                            name='deptNo' 
                            value={deptNo} 
                            className={`form-control ${ errors.deptNo ? 'is-invalid': '' }`}
                            onChange={handleDeptNo}></input>
                            { errors.deptNo && <div className='invalid-feedback'> { errors.deptNo} </div> }

                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'>Department Name:</label>
                            <input type='text' 
                            placeholder='Enter Department Name' 
                            name='deptName' 
                            value={deptName} 
                            className={`form-control ${ errors.deptName ? 'is-invalid': '' }`}
                            onChange={handleDeptName}></input>
                            { errors.deptName && <div className='invalid-feedback'> { errors.deptName} </div> }
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button className='btn btn-success' onClick={saveDepartment} >Submit</button>
                        <button className='btn btn-secondary' onClick={cancelDepartment} >Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent