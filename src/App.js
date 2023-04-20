import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Student from './components/CreateStudent';
import StudentDetail from './components/StudentDetail';

function App() {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Student />} />
      <Route path="/student_details" element={<StudentDetail />} />
      </Routes>
  </BrowserRouter>
);
}
export default App;