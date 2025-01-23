import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import topicsData from '@/data/topics.json';

// const prisma = new PrismaClient();

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(topicsData.topics);

    // Prisma implementation for later:
    /*
    const topics = await prisma.topic.findMany({
      select: {
        id: true,
        title: true,
        subtopics: {
          select: {
            name: true
          }
        }
      }
    });

    const formattedTopics = topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      subtopics: topic.subtopics.map(sub => sub.name)
    }));

    return NextResponse.json(formattedTopics);
    */
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
} 