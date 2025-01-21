import { PreviewContent } from '@/hooks/useTopicSelection';

type LessonPreviewProps = {
  previewContent: PreviewContent;
};

export function LessonPreview({ previewContent }: LessonPreviewProps) {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{previewContent.title}</h2>
        <span className="text-gray-500">{previewContent.duration}</span>
      </div>
      
      <div className="space-y-6">
        {previewContent.topics.map((topic, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">{topic.name}</h3>
            <ul className="space-y-2">
              {topic.concepts.map((concept, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {concept}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-500">
          This preview shows the structure of your personalized learning path. 
          The actual lesson will include detailed explanations, interactive exercises, 
          and practice problems.
        </p>
      </div>
    </div>
  );
} 