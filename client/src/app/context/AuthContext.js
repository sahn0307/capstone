// app/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      // Fetch user data using the token
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Handle error case
        console.error('Failed to fetch user data');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const login = (userData, token) => {
    setUser(userData);
    Cookies.set('access_token', token, { expires: 7 }); // Set the token cookie with a 7-day expiration
  };

  const logout = async () => {
    try {
      await fetch('api/v1/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      Cookies.remove('access_token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};