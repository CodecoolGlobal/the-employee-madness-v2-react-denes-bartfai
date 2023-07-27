import React, { useState, useEffect} from 'react';

const EmployeeSearch = () => {
    const [employeesState, setEmployeesState] = useState ([]);
    const [searchInput, setSearchinput] = useState("")
    const [filteredEmployeesState, setFilteredEmployeesState] = useState([])

    useEffect(() => {
    fetch('/api/employees', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
  })
  .then(response => response.json())
  .then(data => setEmployeesState(data))
  .catch(error => {
      console.log(error);
  });
}, []);
    
    

useEffect(() => {
    if (searchInput) {
      const filteredEmployees = employeesState.filter((employee) => {
          return employee.name.toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredEmployeesState(filteredEmployees);
    } else {
      setFilteredEmployeesState(employeesState);
    }
}, [searchInput, employeesState]);
    
const handleChange = (e) => {
    e.preventDefault();
    setSearchinput(e.target.value);
};
    
  return (
    <div className='EmployeeSearch'>
        Search: 
        <input type='search' onChange={handleChange} value={searchInput} />
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody>
        {filteredEmployeesState.map((employee,index) => {
            return (
                <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.level}</td>
                </tr>
            )
        })}
        </tbody>
        </table>
    </div>
  )
}

export default EmployeeSearch