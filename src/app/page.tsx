'use client';  // Need this for client-side state management
import { useTopics } from '@/hooks/useTopics';
import { TopicCard } from '@/components/TopicCard';
import { LessonPreview } from '@/components/LessonPreview';
import { useTopicSelection } from '@/hooks/useTopicSelection';

export default function Home() {
  const { topics, loading, error } = useTopics();
  const {
    selectedTopics,
    showPreview,
    previewContent,
    handleTopicChange,
    handlePreview,
    handleSubmit
  } = useTopicSelection();

  if (loading) {
    return <div className="min-h-screen p-8 flex items-center justify-center">
      Loading topics...
    </div>;
  }

  if (error) {
    return <div className="min-h-screen p-8 flex items-center justify-center text-red-500">
      Error: {error}
    </div>;
  }

  return (
    <div className="min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Custom Learning Path</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select the topics you're interested in learning
        </p>
        <p className="text-sm text-blue-500 mt-2">
          {selectedTopics.length} topics selected
        </p>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              subtopics={topic.subtopics}
              selectedTopics={selectedTopics}
              onTopicChange={handleTopicChange}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto flex gap-4 justify-center mt-8">
          <button 
            onClick={handlePreview}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedTopics.length === 0}
          >
            Preview Lesson
          </button>

          <button 
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedTopics.length === 0}
          >
            Build My Learning Path ({selectedTopics.length} selected)
          </button>
        </div>

        {showPreview && previewContent && (
          <LessonPreview previewContent={previewContent} />
        )}
      </main>
    </div>
  );
}
