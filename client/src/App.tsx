import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { ProtectedLayout } from './components/protectedLayout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Home from './components/Home';

const App: React.FC = () => {
  return (
   <AuthProvider>
 <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/home" element={<ProtectedLayout><Home /></ProtectedLayout>} />
         
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
         
        
      </Routes>
    </BrowserRouter>
   </AuthProvider>
  );
};

export default App;
