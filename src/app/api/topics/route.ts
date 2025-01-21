import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

const dummyTopics = [
  {
    id: 'math',
    title: 'Mathematics',
    subtopics: ['Algebra', 'Geometry', 'Calculus', 'Statistics']
  },
  {
    id: 'science',
    title: 'Science',
    subtopics: ['Physics', 'Chemistry', 'Biology', 'Earth Science']
  },
  {
    id: 'programming',
    title: 'Programming',
    subtopics: ['Python', 'JavaScript', 'Java', 'Web Development']
  },
  {
    id: 'business',
    title: 'Business',
    subtopics: ['test1', 'test2', 'test3', 'test4']
  }
];

export async function GET() {
  try {
    // Using dummy data for now
    await new Promise(resolve => setTimeout(resolve, 500));
    return NextResponse.json(dummyTopics);

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