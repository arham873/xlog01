import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                XLog
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <>
                <span className="text-gray-600 mr-4">{session.user.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;