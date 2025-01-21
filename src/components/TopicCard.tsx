type TopicCardProps = {
  title: string;
  subtopics: string[];
  selectedTopics: string[];
  onTopicChange: (subtopic: string) => void;
};

export function TopicCard({ title, subtopics, selectedTopics, onTopicChange }: TopicCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {subtopics.map((subtopic) => (
          <li key={subtopic} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id={subtopic}
              checked={selectedTopics.includes(subtopic)}
              onChange={() => onTopicChange(subtopic)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label 
              htmlFor={subtopic} 
              className="text-sm cursor-pointer"
            >
              {subtopic}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
} 