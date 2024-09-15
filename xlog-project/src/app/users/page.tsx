'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import { useUsers } from '@/hooks/useUsers';
import Link from 'next/link';

const UsersPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'position', label: 'Position' },
    { key: 'level', label: 'Level' },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Link
          href="/users/create"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </Link>
      </div>
      <Table
        columns={columns}
        data={users}
        onEdit={(id) => {
          // Handle edit action
        }}
        onDelete={(id) => {
          // Handle delete action
        }}
      />
    </Layout>
  );
};

export default UsersPage;