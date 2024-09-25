import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';


import api from '../../api/api';

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem('employees_data'));
    // if (data !== null && Object.keys(data).length !== 0) setEmployees(data);

    fetchUsers();
  }, []);

  // fetch users from server
  const fetchUsers = async () => {
    const response = await api.get('/users');
    console.log(response,"res");
    if(response.data.count > 0){
      setEmployees(response.data.users);
    }
  }

  const handleEdit = id => {
    const [employee] = employees.filter(employee => employee._id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.value) {
        const [employee] = employees.filter(employee => employee._id === id);

        // remove user api
        try{
          const response = await api.delete(`/user/${id}`);
          console.log(response);
        }catch(err) {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete user',
          });
          return;
        }

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(employee => employee._id !== id);
        localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
        setEmployees(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          {employees.length === 0 ? (
              <p>No Data</p>
          ) : (
              <Table
                  employees={employees}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
              />
          )}
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
