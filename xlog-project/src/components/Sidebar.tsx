'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/users', label: 'Users' },
    { href: '/storage', label: 'Storage' },
    { href: '/customers', label: 'Customers' },
    { href: '/type-assets', label: 'Type Assets' },
    { href: '/history', label: 'History' },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link
                href={item.href}
                className={`block p-2 rounded hover:bg-gray-700 ${
                  pathname === item.href ? 'bg-gray-700' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;