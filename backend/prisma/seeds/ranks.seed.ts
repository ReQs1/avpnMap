import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient();

const RANK_SEED_DATA = [
  {
    code: 'NOVICE',
    name: 'Pizza Novice',
    icon: '🍕',
    color: '#94a3b8',
  },
  {
    code: 'APPRENTICE',
    name: 'Pizza Apprentice',
    icon: '👨‍🍳',
    color: '#06b6d4',
  },
  {
    code: 'EXPERT',
    name: 'Pizza Expert',
    icon: '⭐',
    color: '#10b981',
  },
  {
    code: 'MASTER',
    name: 'Pizza Master',
    icon: '👑',
    color: '#f59e0b',
  },
  {
    code: 'NEAPOLITAN',
    name: 'True Neapolitan',
    icon: '🛵',
    color: '#ef4444',
  },
  {
    code: 'LEGEND',
    name: 'Pizza Legend',
    icon: '🏆',
    color: '#8b5cf6',
  },
];

export async function seedRanks() {
  console.log('Start seeding ranks...');

  try {
    const existing = (await prisma.rank.findMany({
      select: {
        code: true,
      },
    })) as { code: string }[];

    const existingCodes = new Set(existing.map((ach) => ach.code));

    const newRanks = RANK_SEED_DATA.filter(
      (rank) => !existingCodes.has(rank.code),
    );

    if (newRanks.length > 0) {
      const result = await prisma.rank.createMany({
        data: newRanks,
        skipDuplicates: true,
      });
      console.log(`Created ${result.count} new ranks`);
    } else {
      console.log('All ranks already exist in the database.');
    }
  } catch (err) {
    console.error('Error seeding ranks:', err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
