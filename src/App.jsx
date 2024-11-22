import { useState } from 'react'
import './App.css'
import ListEmpComp from './components/ListEmpComp'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import DeleteEmployeeComponent from './components/DeleteEmployeeComponent'
import ListEmpCompGrid from './components/ListEmplCompGrid'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //<Route path="/" element={    <ListEmpComp/>}></Route> */}
          {/* <Route path="/employees" element={    <ListEmpComp/>}></Route>  */}
          <Route path="/employees" element={<ListEmpCompGrid />}></Route>
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          <Route path="/edit-employee/:id" element={<EmployeeComponent />}></Route>
          <Route path="/delete-employee/:id" element={<DeleteEmployeeComponent />}></Route>
          <Route path="/departments" element={<ListDepartmentComponent />}></Route>
          <Route path="/add-department" element={<DepartmentComponent />}></Route>
          

        </Routes>
        <FooterComponent />
      </BrowserRouter>

      
    </>
  )
}

// const App = () => {
//   const { isAuthenticated } = useAuth0();

//   return (
//     <Routes>
//     <Route>
//       <div>
//         <Navbar />
//         {isAuthenticated ? (
//           <Routes>
//             <Route path="/" element={<Home />} />
//           </Routes>
//         ) : (
//           <LoginButton />
//         )}
//       </div>
//     </Route>
//     </Routes>
//   );
// };

 export default App
