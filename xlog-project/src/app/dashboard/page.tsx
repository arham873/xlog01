'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      {/* Add dashboard content here */}
    </Layout>
  );
};

export default DashboardPage;