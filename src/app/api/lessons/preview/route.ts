import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// Dummy data for lesson concepts
const conceptTemplates = {
  algebra: [
    'Linear equations and inequalities',
    'Quadratic functions and graphs',
    'Systems of equations and matrices',
    'Polynomial and rational expressions'
  ],
  geometry: [
    'Euclidean geometry fundamentals',
    'Triangles and trigonometry',
    'Circles and spheres',
    'Area, volume, and surface area'
  ],
  calculus: [
    'Limits and continuity',
    'Derivatives and differentiation',
    'Integration techniques',
    'Applications in physics'
  ],
  statistics: [
    'Descriptive statistics',
    'Probability distributions',
    'Hypothesis testing',
    'Regression analysis'
  ],
  physics: [
    'Classical mechanics',
    'Waves and oscillations',
    'Electricity and magnetism',
    'Modern physics concepts'
  ],
  chemistry: [
    'Atomic structure',
    'Chemical bonding',
    'Reactions and equations',
    'Organic chemistry basics'
  ],
  biology: [
    'Cell structure and function',
    'Genetics and inheritance',
    'Evolution and diversity',
    'Human anatomy'
  ],
  python: [
    'Python syntax and data types',
    'Control flow and functions',
    'Object-oriented programming',
    'Libraries and frameworks'
  ],
  javascript: [
    'DOM manipulation',
    'Async programming',
    'Modern ES6+ features',
    'Frontend frameworks'
  ],
  java: [
    'Java fundamentals',
    'Object-oriented concepts',
    'Collections framework',
    'Multithreading basics'
  ],
  "earth science": [
    'Plate tectonics and Earth structure',
    'Weather patterns and climate systems',
    'Rock cycles and mineral formation',
    'Ocean dynamics and ecosystems'
  ],
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