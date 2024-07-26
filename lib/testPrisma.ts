import { prisma } from '@/lib/db';

async function testPrisma() {
  const user = await prisma.user.findFirst();
  console.log(user);
}

testPrisma();