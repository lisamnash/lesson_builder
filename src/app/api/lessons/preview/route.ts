import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

type Concept = {
  title: string;
  duration: number; // in minutes
};

const conceptTemplates: Record<string, Concept[]> = {
  algebra: [
    { title: 'Linear equations and inequalities', duration: 45 },
    { title: 'Quadratic functions and graphs', duration: 60 },
    { title: 'Systems of equations and matrices', duration: 50 },
    { title: 'Polynomial and rational expressions', duration: 40 }
  ],
  geometry: [
    { title: 'Euclidean geometry fundamentals', duration: 30 },
    { title: 'Triangles and trigonometry', duration: 45 },
    { title: 'Circles and spheres', duration: 35 },
    { title: 'Area, volume, and surface area', duration: 40 }
  ],
  calculus: [
    { title: 'Limits and continuity', duration: 40 },
    { title: 'Derivatives and differentiation', duration: 55 },
    { title: 'Integration techniques', duration: 60 },
    { title: 'Applications in physics', duration: 45 }
  ],
  statistics: [
    { title: 'Descriptive statistics', duration: 35 },
    { title: 'Probability distributions', duration: 45 },
    { title: 'Hypothesis testing', duration: 50 },
    { title: 'Regression analysis', duration: 40 }
  ],
  physics: [
    { title: 'Classical mechanics', duration: 50 },
    { title: 'Waves and oscillations', duration: 45 },
    { title: 'Electricity and magnetism', duration: 55 },
    { title: 'Modern physics concepts', duration: 40 }
  ],
  chemistry: [
    { title: 'Atomic structure', duration: 40 },
    { title: 'Chemical bonding', duration: 45 },
    { title: 'Reactions and equations', duration: 50 },
    { title: 'Organic chemistry basics', duration: 55 }
  ],
  biology: [
    { title: 'Cell structure and function', duration: 45 },
    { title: 'Genetics and inheritance', duration: 50 },
    { title: 'Evolution and diversity', duration: 40 },
    { title: 'Human anatomy', duration: 45 }
  ],
  python: [
    { title: 'Python syntax and data types', duration: 35 },
    { title: 'Control flow and functions', duration: 45 },
    { title: 'Object-oriented programming', duration: 50 },
    { title: 'Libraries and frameworks', duration: 40 }
  ],
  javascript: [
    { title: 'DOM manipulation', duration: 40 },
    { title: 'Async programming', duration: 50 },
    { title: 'Modern ES6+ features', duration: 45 },
    { title: 'Frontend frameworks', duration: 55 }
  ],
  java: [
    { title: 'Java fundamentals', duration: 40 },
    { title: 'Object-oriented concepts', duration: 50 },
    { title: 'Collections framework', duration: 45 },
    { title: 'Multithreading basics', duration: 55 }
  ],
  "earth science": [
    { title: 'Plate tectonics and Earth structure', duration: 350 },
    { title: 'Weather patterns and climate systems', duration: 45 },
    { title: 'Rock cycles and mineral formation', duration: 30 },
    { title: 'Ocean dynamics and ecosystems', duration: 40 }
  ],
  // ... other subtopics can be added
};

export async function POST(request: Request) {
  try {
    const { selectedTopics } = await request.json();

    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate total duration across all selected topics
    const totalMinutes = selectedTopics.reduce((total, topic) => {
      const concepts = conceptTemplates[topic.toLowerCase() as keyof typeof conceptTemplates] || [];
      return total + concepts.reduce((sum, concept) => sum + concept.duration, 0);
    }, 0);

    const previewContent = {
      title: "Your Custom Learning Path",
      duration: `Estimated time ${Math.floor(totalMinutes / 60)} hours ${totalMinutes % 60} minutes`,
      topics: selectedTopics.map(topic => {
        const concepts = conceptTemplates[topic.toLowerCase() as keyof typeof conceptTemplates] || 
          [{ title: 'No lesson content available yet for this topic', duration: 0 }];
        
        const topicMinutes = concepts.reduce((sum, concept) => sum + concept.duration, 0);
        
        return {
          name: topic,
          totalDuration: `${Math.floor(topicMinutes / 60)} hours ${topicMinutes % 60} minutes`,
          concepts: concepts.map(c => `${c.title} (${c.duration} min)`)
        };
      })
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