import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/Home';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import SignInPage from './components/SignInPage';
import { AuthProvider } from './AuthContext';  
import ProtectedRoute from './components/ProtectedRoute';  

function App() {
  return (
    <Router> 
      <AuthProvider> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/user" 
            element={<ProtectedRoute role="user" component={UserPage} />} 
          />
          <Route 
            path="/admin" 
            element={<ProtectedRoute role="admin" component={AdminPage} />} 
          />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
