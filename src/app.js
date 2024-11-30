import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './app.css'
import { Department } from './pages/department/department'
import { LoginPage } from './pages/login_page/login_page'
import { Student } from './pages/student/student'
import { Partner } from './pages/partner/partner'
import PrivateRoute from './routes/PrivateRoute'
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student" element={<PrivateRoute element={<Student/>}/>}/>
      <Route path="/department" element={<PrivateRoute element={<Department/>}/>}/>
      <Route path="/partner" element={<PrivateRoute element={<Partner/>}/>}/>
    </Routes>
  );
}

export default App;