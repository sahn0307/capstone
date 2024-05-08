// app/context/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/v1/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          const refreshResponse = await fetch('http://localhost:5555/api/v1/refresh', {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
            const refreshedUserData = await refreshResponse.json();
            setUser(refreshedUserData);
          } else {
            router.push('/auth');
            toast.error('Please log in');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/auth');
        toast.error('An error occurred. Please log in again.');
      }
    };

    fetchUserData();
  }, [router]);

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
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};