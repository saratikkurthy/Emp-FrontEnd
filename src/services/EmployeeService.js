import axois from "axios";
const REST_BASE_URL = "http://192.168.1.139:8080/employees/findActive";
const REST_ADD_EMPLOYEE = "http://192.168.1.139:8080/employees/add"
const REST_FIND_EMPLOYEE = "http://192.168.1.139:8080/employees/empId/"
const REST_GET_DEPARTMENTS= "http://192.168.1.139:8080/departments"
const REST_ADD_DEPARTMENT = "http://192.168.1.139:8080/departments/add"

export const listEmployees = axois.get(REST_BASE_URL)
export const createEmployee = (employee) => axois.post(REST_ADD_EMPLOYEE, employee);
export const updateEmployee = (employee) => axois.post(REST_ADD_EMPLOYEE, employee);
export const getEmployee = (empNo) => axois.get(REST_FIND_EMPLOYEE + empNo)
export const deleteEmployee = (employee) => axois.post(REST_ADD_EMPLOYEE, employee);
export const departments =(departments) => axois.get(REST_GET_DEPARTMENTS)
export const updateDepartment = (departments) => axois.post(REST_ADD_DEPARTMENT,departments)
export const getDepartment = (deptNo) => axois.get(REST_GET_DEPARTMENTS+'/getdepartment/'+deptNo)

