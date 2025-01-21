import { useState } from 'react';

export type PreviewContent = {
  title: string;
  duration: string;
  topics: Array<{
    name: string;
    concepts: string[];
  }>;
};

export function useTopicSelection() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTopicChange = (subtopic: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(subtopic)) {
        return prev.filter(topic => topic !== subtopic);
      }
      return [...prev, subtopic];
    });
    // Hide preview when selections change
    setShowPreview(false);
  };

  const handlePreview = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lessons/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedTopics })
      });
      
      if (!response.ok) throw new Error('Failed to generate preview');
      
      const data = await response.json();
      setPreviewContent(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Preview generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic');
      return;
    }
    console.log('Selected topics:', selectedTopics);
    // Here you would typically send this data to your backend
  };

  return {
    selectedTopics,
    showPreview,
    previewContent,
    loading,
    handleTopicChange,
    handlePreview,
    handleSubmit
  };
} 