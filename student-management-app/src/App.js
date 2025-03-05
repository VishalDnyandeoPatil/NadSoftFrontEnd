import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateStudentForm from './components/CreateStudentForm';
import ViewAllStudents from './components/ViewAllStudents';
import GetStudentById from './components/GetStudentById';
import UpdateStudent from './components/UpdateStudent';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student-creat" element={<CreateStudentForm />} />
          <Route path="/view-students" element={<ViewAllStudents />} />
          <Route path="/student/:id" element={<GetStudentById />} />
          <Route path="/student/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
