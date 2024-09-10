// /app/api/submit/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Export nommé pour la méthode POST
export async function POST(req: Request) {
  try {
    const { responses } = await req.json();

    // Validation de base des données d'entrée
    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: 'Les données fournies sont invalides.' }, { status: 400 });
    }

    // Création des réponses en utilisant une transaction
    await prisma.$transaction(
      responses.map((response) =>
        prisma.response.create({
          data: {
            questionId: response.questionId,
            selectedAnswer: response.selectedAnswer,
          },
        })
      )
    );

    return NextResponse.json({ message: 'Réponses enregistrées avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des réponses :', error);
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement des réponses.' }, { status: 500 });
  }
}
