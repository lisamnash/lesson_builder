type TopicCardProps = {
  title: string;
  subtopics: string[];
  selectedTopics: string[];
  onTopicChange: (subtopic: string) => void;
};

export function TopicCard({ title, subtopics, selectedTopics, onTopicChange }: TopicCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl 
                  transition-all duration-300 border border-gray-100 dark:border-gray-700 
                  hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-y-1 
                  group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <ul className="space-y-3">
        {subtopics.map((subtopic) => (
          <li key={subtopic} className="flex items-center gap-3 group">
            <div className="relative">
              <input 
                type="checkbox" 
                id={subtopic}
                checked={selectedTopics.includes(subtopic)}
                onChange={() => onTopicChange(subtopic)}
                className="w-5 h-5 rounded-md border-2 border-gray-300 dark:border-gray-600 
                          checked:bg-blue-500 checked:border-blue-500 transition-colors
                          focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label 
              htmlFor={subtopic} 
              className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer
                         group-hover:text-blue-500 transition-colors"
            >
              {subtopic}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
} 