// app/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

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
          'X-CSRF-TOKEN': getCookie('csrf_access_token'),
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

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5555/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'X-CSRF-TOKEN': getCookie('csrf_access_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to update user profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, getCookie }}>
      {children}
    </AuthContext.Provider>
  );
};