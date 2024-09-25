import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../api/api';

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [M_number, setM_number] = useState('');
  const [district, setDistrict] = useState('');


  const handleAdd = async e => {
    e.preventDefault();

    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for NIC validation
    const nicPattern = /^(?:\d{12}|\d{9}[vVxX])$/; // Matches 12 digits or 9 digits followed by 1 letter (v, V, x, X)

    // Regular expression for mobile number validation
    const mobilePattern = /^[0-9]{10}$/; // Example pattern: adjust as needed

    if (!name || !email || !nic || !M_number || !district ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    if (!emailPattern.test(email)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid Email!',
        text: 'Please enter a valid email address.',
        showConfirmButton: true,
      });
    }

    if (!nicPattern.test(nic)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid NIC!',
        text: 'Please enter a valid NIC number.',
        showConfirmButton: true,
      });
    }

    if (!mobilePattern.test(M_number)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid Mobile Number!',
        text: 'Please enter a valid mobile number.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      name,
      email,
      nic,
      mobileNumber: M_number,
      district,

    };

    try {
      const response = await api.post('/user', newEmployee);
      const addedEmployee = response.data.user;
      addedEmployee.id = id;

      employees.push(addedEmployee);
      localStorage.setItem('employees_data', JSON.stringify(employees));
      setEmployees(employees);
      setIsAdding(false);

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${name}'s data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while adding the employee.',
        showConfirmButton: true,
      });
    }
  };


  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Student</h1>
        <label htmlFor="firstName">Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">NIC</label>
        <input
          id="salary"
          type="text"
          name="salary"
          value={nic}
          onChange={e => setNic(e.target.value)}
        />
        <label htmlFor="salary">Mobile_Number</label>
        <input
          id="mnumber"
          type="text"
          name="mnumber"
          value={M_number}
          onChange={e => setM_number(e.target.value)}
        />
        <label htmlFor="salary">Districts</label>
        <input
          id="dis"
          type="text"
          name="dis"
          value={district}
          onChange={e => setDistrict(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
