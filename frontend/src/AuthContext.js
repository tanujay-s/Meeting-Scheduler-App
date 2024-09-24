import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,       
    isAdmin: false,   
  });

  const navigate = useNavigate();


  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  
  const login = (userData) => {
    setAuth({
      isLoggedIn: true,
      user: userData.user,
      id: userData.userId,       
      isAdmin: userData.isAdmin  
    });

 
    localStorage.setItem('auth', JSON.stringify({
      isLoggedIn: true,
      user: userData.user,
      id:userData.userId,
      isAdmin: userData.isAdmin
    }));

    if (userData.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };


  const logout = async () => {
    try {
        await axios.post('/logout');

        setAuth({ isLoggedIn: false, user: null, isAdmin: false });
        localStorage.removeItem('auth');

        navigate('/signin');
    } catch (error) {
        console.error('Logout error: ', error);
    }
};

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
