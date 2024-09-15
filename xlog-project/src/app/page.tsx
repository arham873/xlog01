'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to XLog</h1>
        <p className="text-xl mb-8">Your Asset Management Solution</p>
        
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : session ? (
          <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </Link>
        ) : (
          <Link href="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        )}
      </main>

      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 XLog. All rights reserved.</p>
      </footer>
    </div>
  );
}