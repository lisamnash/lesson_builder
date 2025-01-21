import { useState, useEffect } from 'react';

export type Topic = {
  id: string;
  title: string;
  subtopics: string[];
};

export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        const response = await fetch('/api/topics');
        
        if (!response.ok) throw new Error('Failed to fetch topics');
        
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  return { topics, loading, error };
} 