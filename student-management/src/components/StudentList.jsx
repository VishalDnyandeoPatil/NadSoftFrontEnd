// src/components/StudentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudentList = ({ setSelectedStudent, refreshList, setRefreshList }) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [page, refreshList]);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/students?page=${page}`);
      setStudents(data.getAllStudentData);
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/students/${id}`);
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
        setRefreshList((prev) => !prev);
      }
    });
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Standard</th>
            <th>Division</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.age}</td>
              <td>{student.standard}</td>
              <td>{student.division}</td>
              <td>
                <button 
                  className="btn btn-warning me-2" 
                  onClick={() => setSelectedStudent(student)}
                >Edit</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(student.id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
