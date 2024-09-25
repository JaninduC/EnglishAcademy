import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../api/api';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;
  const [name, setName] = useState(selectedEmployee.name);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [nic, setNic] = useState(selectedEmployee.nic);
  const [M_number, setM_number] = useState(selectedEmployee.mobileNumber);
  const [district, setDistrict] = useState(selectedEmployee.district);

  const handleUpdate = async e => {
    e.preventDefault();

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
    const employee = {
      id,
      name,
      email,
      nic,
      mobileNumber: M_number,
      district,

    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    // update user api
    try{
      const response = await api.put(`/user/${selectedEmployee._id}`, employee);
      if(!response.data.success){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to update employee data.',
          showConfirmButton: true,
        });
        return;
      }
    }catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update employee data.',
        showConfirmButton: true,
      });
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
      <div className="small-container">
        <form onSubmit={handleUpdate}>
          <h1>Edit Student</h1>
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
          <label htmlFor="salary">District</label>
          <input
              id="dis"
              type="text"
              name="dis"
              value={district}
              onChange={e => setDistrict(e.target.value)}
          />

          <div style={{marginTop: '30px'}}>
            <input type="submit" value="Update"/>
            <input
                style={{marginLeft: '12px'}}
                className="muted-button"
                type="button"
                value="Cancel"
                onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      </div>
  );
};

export default Edit;