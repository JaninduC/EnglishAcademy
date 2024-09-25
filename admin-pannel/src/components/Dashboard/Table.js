import React from 'react';

const Table = ({ employees, handleEdit, handleDelete }) => {
  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });



  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>District</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
                <tr key={employee.id}>
                  <td>{i + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.nic}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>{employee.district}</td>
                  {/*<td>{new Date(employee.createdAt || employee.date).toLocaleDateString()}</td>*/}
                  <td className="text-right">
                    <button
                        onClick={() => handleEdit(employee._id)}
                        className="button muted-button"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-left">
                    <button
                        onClick={() => handleDelete(employee._id)}
                        className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))
          ) : (
              <tr>
              <td colSpan={7}>No Clients</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
