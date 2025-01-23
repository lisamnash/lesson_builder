import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import conceptsData from '@/data/concepts.json';

// const prisma = new PrismaClient();


export async function POST(request: Request) {
  try {
    const { selectedTopics } = await request.json();

    await new Promise(resolve => setTimeout(resolve, 500));

    const totalMinutes = selectedTopics.reduce((total: number, topic: string) => {
      const concepts = conceptsData[topic.toLowerCase() as keyof typeof conceptsData] || [];
      return total + concepts.reduce((sum, concept) => sum + concept.duration, 0);
    }, 0);

    const previewContent = {
      title: "Your Custom Learning Path",
      duration: `Estimated time ${Math.floor(totalMinutes / 60)} hours ${totalMinutes % 60} minutes`,
      topics: selectedTopics.map(topic => {
        const concepts = conceptsData[topic.toLowerCase() as keyof typeof conceptsData] || 
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