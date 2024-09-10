import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Export nommé pour la méthode GET
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: { choices: true },
    });
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Erreur lors de la récupération des questions :', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des questions.' }, { status: 500 });
  }
}