import './App.css';
import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Management System</h2>
      <StudentForm 
        selectedStudent={selectedStudent} 
        setSelectedStudent={setSelectedStudent} 
        setRefreshList={setRefreshList} 
      />
      <StudentList 
        setSelectedStudent={setSelectedStudent} 
        refreshList={refreshList} 
        setRefreshList={setRefreshList} 
      />
    </div>
  );


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
