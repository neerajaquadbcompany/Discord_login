
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_END_POINT } from '../util/variable';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${REACT_APP_END_POINT}/api/status`,{credentials: 'include'});
      if (response.data.loggedIn) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

 
  const logout = async () => {
    try {
      await axios.get(`${REACT_APP_END_POINT}/api/logout`,{withCredentials:true});
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
