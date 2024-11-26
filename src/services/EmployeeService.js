import axois from "axios";
const SERVER_IP = "http://192.168.4.48:8080"
const REST_BASE_URL = SERVER_IP+"/employees/findActive";
const REST_ADD_EMPLOYEE = SERVER_IP+"/employees/add"
const REST_FIND_EMPLOYEE = SERVER_IP+"/employees/empId/"
const REST_GET_DEPARTMENTS= SERVER_IP+"/departments"
const REST_ADD_DEPARTMENT = SERVER_IP+"/departments/add"
console.log("REST_BASE_URL:"+REST_BASE_URL)
export const listEmployees = axois.get(REST_BASE_URL,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},})
export const createEmployee = (employee) => axois.post(REST_ADD_EMPLOYEE, employee, {
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},});
export const updateEmployee = (employee) => axois.post(REST_ADD_EMPLOYEE, employee,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},});
export const getEmployee = (empNo) => axois.get(REST_FIND_EMPLOYEE + empNo,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},})
export const deleteEmployee = (employee) => axois.post(REST_ADD_EMPLOYEE, employee,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},});
export const departments =(departments) => axois.get(REST_GET_DEPARTMENTS,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},})
export const updateDepartment = (departments) => axois.post(REST_ADD_DEPARTMENT,departments,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},})
export const getDepartment = (deptNo) => axois.get(REST_GET_DEPARTMENTS+'/getdepartment/'+deptNo,{
	headers: {
	  'Access-Control-Allow-Origin': '*',
	},})

