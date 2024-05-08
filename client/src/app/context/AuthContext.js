// app/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already authenticated on initial load
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/v1/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:5555/api/v1/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // const updateUser = async (userId, updatedData) => {
  //   try {
  //     const response = await fetch(`http://localhost:5555/api/v1/users/${userId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedData),
  //       credentials: 'include',
  //     });

  //     if (response.ok) {
  //       const updatedUser = await response.json();
  //       setUser(updatedUser);
  //     } else {
  //       throw new Error('Failed to update user profile');
  //     }
  //   } catch (error) {
  //     console.error('Error updating user profile:', error);
  //     throw error;
  //   }
  // };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUserData,}}>
      {children}
    </AuthContext.Provider>
  );
};