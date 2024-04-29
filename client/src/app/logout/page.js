// app/logout/page.js
'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('api/v1/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        logout();
        router.push('/login');
      } else {
        console.error('Logout error:', response.statusText);
        // Handle logout error, e.g., display error message
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}