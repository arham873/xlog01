// src/hooks/useUsers.ts

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  position: string;
  level: string;
}

export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
