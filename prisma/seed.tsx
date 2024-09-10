import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const questionsData = JSON.parse(fs.readFileSync('app/src/questions.json', 'utf-8'));

  for (const question of questionsData.questions) {
    await prisma.question.create({
      data: {
        question: question.question,
        choices: {
          create: question.choices.map((choice: string) => ({ text: choice }))
        }
      }
    });
  }

  console.log('Questions insérées avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });