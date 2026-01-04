import { PrismaClient } from 'prisma/generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { pizzerias } from './pizzerias.data';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function seedPizzerias() {
  console.log('Start seeding pizzerias...');
  try {
    const existing = await prisma.pizzeria.findMany({
      select: { name: true },
    });
    const existingPizzeriaNames = new Set(existing.map((p) => p.name));

    const newPizzerias = pizzerias.filter(
      (p) => !existingPizzeriaNames.has(p.name),
    );

    if (newPizzerias.length > 0) {
      const result = await prisma.pizzeria.createMany({
        data: newPizzerias,
        skipDuplicates: true,
      });
      console.log(`Created ${result.count} new pizzerias`);
    } else {
      console.log('All pizzerias already exist in the database.');
    }
  } catch (err) {
    console.error('Error seeding pizzerias:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
