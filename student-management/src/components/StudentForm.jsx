// src/components/StudentForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudentForm = ({ selectedStudent, setSelectedStudent, setRefreshList }) => {
  const [student, setStudent] = useState({ firstName: '', lastName: '', age: '', standard: '', division: '' });

  useEffect(() => {
    if (selectedStudent) setStudent(selectedStudent);
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (student.id) {
        await axios.patch(`http://localhost:5000/studentManagement/updateStudent/${student.id}`, student);
        Swal.fire('Updated!', 'Student data updated successfully', 'success');
      } else {
        await axios.post('http://localhost:5000/studentManagement/createStudent', student);
        Swal.fire('Created!', 'New student added successfully', 'success');
      }
      setStudent({ firstName: '', lastName: '', age: '', standard: '', division: '' });
      setRefreshList((prev) => !prev);
      setSelectedStudent(null);
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-3 mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="First Name" 
            name="firstName" 
            value={student.firstName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-3 mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Last Name" 
            name="lastName" 
            value={student.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Age" 
            name="age" 
            value={student.age} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Standard" 
            name="standard" 
            value={student.standard} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Division" 
            name="division" 
            value={student.division} 
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {student.id ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
