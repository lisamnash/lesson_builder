import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// Dummy data for lesson concepts
const conceptTemplates = {
  algebra: [
    'Linear equations',
    'Quadratic functions',
    'Systems of equations',
    'Algebraic proofs'
  ],
  geometry: [
    'Euclidean geometry',
    'Triangles and circles',
    'Area and volume',
    'Geometric proofs'
  ],
  python: [
    'Basic syntax',
    'Data structures',
    'Functions and classes',
    'Building applications'
  ],
  javascript: [
    'DOM manipulation',
    'ES6+ features',
    'Async programming',
    'Web APIs'
  ]
  // ... other subtopics can be added
};

export async function POST(request: Request) {
  try {
    const { selectedTopics } = await request.json();

    // Using dummy data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    const previewContent = {
      title: "Your Custom Learning Path",
      duration: `Estimated ${selectedTopics.length * 2}-${selectedTopics.length * 3} hours`,
      topics: selectedTopics.map(topic => ({
        name: topic,
        concepts: conceptTemplates[topic.toLowerCase() as keyof typeof conceptTemplates] || 
          ['No lesson content available yet for this topic']
      }))
    };
    return NextResponse.json(previewContent);

    /* Prisma implementation for later:
    const lessonPreview = await prisma.lessonTemplate.findMany({
      where: {
        topicName: {
          in: selectedTopics
        }
      },
      select: {
        name: true,
        concepts: true,
        estimatedDuration: true
      }
    });

    const formattedPreview = {
      title: "Your Custom Learning Path",
      duration: calculateTotalDuration(lessonPreview),
      topics: formatLessonPreview(lessonPreview)
    };

    return NextResponse.json(formattedPreview);
    */

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    );
  }
} 