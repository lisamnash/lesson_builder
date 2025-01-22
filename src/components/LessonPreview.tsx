import { PreviewContent } from '@/hooks/useTopicSelection';

type LessonPreviewProps = {
  previewContent: PreviewContent;
};

export function LessonPreview({ previewContent }: LessonPreviewProps) {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {previewContent.title}
        </h2>
        <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
          {previewContent.duration}
        </span>
      </div>
      
      <div className="space-y-8">
        {previewContent.topics.map((topic, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {topic.name}
            </h3>
            <ul className="space-y-3">
              {topic.concepts.map((concept, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {concept}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          This preview shows the structure of your personalized learning path. 
          The actual lesson will include detailed explanations, interactive exercises, 
          and practice problems.
        </p>
      </div>
    </div>
  );
} 