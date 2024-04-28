// app/layout.js
'use client';

import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h3 className="header">MTG APP</h3>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}