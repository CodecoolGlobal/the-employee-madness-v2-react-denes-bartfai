import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [employeesState, setEmployeesState] = useState (employees);
  const [sortByFirstName, setSortByFirstName] = useState('false');
  const [sortByLastName, setSortByLastName] = useState('false');
  const [sortByMiddleName, setSortByMiddleName] = useState('false');
  const [sortByPosition, setSortByPosition] = useState('false');
  const [sortByLevel, setSortByLevel] = useState('false');
  const [selectedPosition,setSelectedPosition] = useState('');
  const [selectedLevel,setSelectedLevel] = useState('');

  const filterEmployees = employeesState.filter(employee => {
    const isMatchingPosition = selectedPosition === '' || selectedPosition === employee.position;
    const isMatchingLevel = selectedLevel === '' || selectedLevel === employee.level;

    return isMatchingPosition && isMatchingLevel;
});

const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
};

const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
};

  const sortEmployeesByFirstName = () => {
    setSortByFirstName(!sortByFirstName);
    const sortedEmployees = [...filterEmployees].sort((a, b) => {
      const nameA = a.name.split(" ");
      const nameB = b.name.split(" ");

      return sortByFirstName
      ? nameA[0].localeCompare(nameB[0])
      : nameB[0].localeCompare(nameA[0]);
    });
    setEmployeesState(sortedEmployees)
  }

  const sortEmployeesByLastName = () => {
    setSortByLastName(!sortByLastName);
    const sortedEmployees = [...filterEmployees].sort((a, b) => {
      const nameA = a.name.split(" ");
      const nameB = b.name.split(" ");

      return sortByLastName
      ? nameA[nameA.length -1].localeCompare(nameB[nameB.length -1])
      : nameB[nameB.length -1].localeCompare(nameA[nameA.length -1]);
    });
    setEmployeesState(sortedEmployees);
  };

  const sortEmployeesByMiddleName = () => {
    setSortByMiddleName(!sortByMiddleName);
    const sortedEmployees = [...filterEmployees].sort((a, b) => {
      const nameA = a.name.split(" ");
      const nameB = b.name.split(" ");
      const middleNameA = nameA.length > 2 ? nameA[1] : "";
      const middleNameB = nameB.length > 2 ? nameB[1] : "";

      return sortByMiddleName
      ? middleNameA.localeCompare(middleNameB)
      : middleNameB.localeCompare(middleNameA);
    });
    setEmployeesState(sortedEmployees);
  };

  const sortEmployeesByPosition = () => {
    setSortByPosition(!sortByPosition);
    const sortedEmployees = [...filterEmployees].sort((a, b) => {
      return sortByPosition
        ? a.position.localeCompare(b.position)
        : b.position.localeCompare(a.position);
    });
    setEmployeesState(sortedEmployees);
  };

  const sortEmployeesByLevel = () => {
    setSortByLevel(!sortByLevel);
    const sortedEmployees = [...filterEmployees].sort((a, b) => {
      return sortByLevel
        ? a.level.localeCompare(b.level)
        : b.level.localeCompare(a.level);
    });
    setEmployeesState(sortedEmployees);
  };
  
  return (
    <div className="EmployeeTable">
      <div>
        <label htmlFor="positionFilter">Filter by position:</label>
        <select
          id="positionFilter"
          value={selectedPosition}
          onChange={handlePositionChange}
        >
          <option value={""}>All</option>
          <option value={"Main Actor"}>Main Actor</option>
          <option value={"Comic Relief"}>Comic Relief</option>
          <option value={"Love Interests"}>Love Interests</option>
          <option value={"Protagonist"}>Protagonist</option>
          <option value={"Antagonist"}>Antagonist</option>
          <option value={"Operatour"}>Operatour</option>
          <option value={"Director"}>Director</option>
          <option value={"Joker"}>Joker</option>
        </select>
      </div>
      <div>
        <label htmlFor="levelFilter">Filter by level</label>
        <select
          id="levelFilter"
          value={selectedLevel}
          onChange={handleLevelChange}
        >
          <option value={""}>All</option>
          <option value={"Junior"}>Junior</option>
          <option value={"Medior"}>Medior</option>
          <option value={"Senior"}>Senior</option>
          <option value={"Expert"}>Expert</option>
          <option value={"Godlike"}>Godlike</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={sortEmployeesByFirstName}>First Name</th>
            <th onClick={sortEmployeesByMiddleName}>Middle Name</th>
            <th onClick={sortEmployeesByLastName}>Last Name</th>
            <th onClick={sortEmployeesByPosition}>Position</th>
            <th onClick={sortEmployeesByLevel}>Level</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filterEmployees.map((employee) => {
            const nameParts = employee.name.split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts[nameParts.length - 1];
            const middleName = nameParts.length > 2 ? nameParts[1] : "";
            return (
              <tr key={employee._id}>
                <td>{firstName}</td>
                <td>{middleName}</td>
                <td>{lastName}</td>
                <td>{employee.position}</td>
                <td>{employee.level}</td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
    </div>
  );
        }

export default EmployeeTable;
