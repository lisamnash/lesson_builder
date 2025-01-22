'use client';  // Need this for client-side state management
import { useTopics } from '@/hooks/useTopics';
import { TopicCard } from '@/components/TopicCard';
import { LessonPreview } from '@/components/LessonPreview';
import { useTopicSelection } from '@/hooks/useTopicSelection';
import { LoadingSpinner } from '@/components/LoadingSpinner';

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
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Custom Learning Path
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Select the topics you're interested in learning
        </p>
        <p className="text-sm text-blue-500 mt-2 font-medium">
          {selectedTopics.length} topics selected
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
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

        <div className="max-w-3xl mx-auto flex gap-4 justify-center mt-12">
          <button 
            onClick={handlePreview}
            disabled={selectedTopics.length === 0 || loading}
            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300
                     shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                     border border-gray-200 dark:border-gray-700 relative group"
          >
            {loading ? (
              <>
                <span className="opacity-0">Preview Lesson</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              'Preview Lesson'
            )}
          </button>

          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full
                     hover:from-blue-700 hover:to-blue-600 transition-all duration-300
                     shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
