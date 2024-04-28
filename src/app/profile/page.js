// app/profile/page.js
'use client';

import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if user is not authenticated
    return null;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}