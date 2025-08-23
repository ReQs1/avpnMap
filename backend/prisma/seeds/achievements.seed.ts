import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

const achievements = [
  // Visit-based achievements
  {
    code: 'VISIT_1',
    title: 'Primo Assaggio',
    description: 'Visit your first pizzeria.',
    icon: '🍕',
  },
  {
    code: 'VISIT_10',
    title: 'Pizzaiolo Apprendista',
    description: 'Visit 10 different pizzerias.',
    icon: '🧑‍🍳',
  },
  {
    code: 'VISIT_25',
    title: 'Maestro Pizzaiolo',
    description: 'Visit 25 different pizzerias.',
    icon: '👨‍🍳',
  },
  {
    code: 'VISIT_50',
    title: 'Leggenda della Pizza',
    description: 'Visit 50 different pizzerias.',
    icon: '👑',
  },
  {
    code: 'VISIT_100',
    title: 'Ambasciatore della Pizza',
    description: 'Visit 100 different pizzerias.',
    icon: '🏅',
  },
  {
    code: 'VISIT_250',
    title: 'Conquistatore di Sapori',
    description: 'Visit 250 different pizzerias.',
    icon: '⚔️',
  },
  {
    code: 'VISIT_500',
    title: 'Imperatore del Gusto',
    description: 'Visit 500 different pizzerias.',
    icon: '🏛️',
  },
  // Rating-based achievements
  {
    code: 'RATE_1',
    title: 'Critico Nascente',
    description: 'Rate your first pizzeria.',
    icon: '✍️',
  },
  {
    code: 'RATE_10',
    title: 'Gourmet Esperto',
    description: 'Rate 10 different pizzerias.',
    icon: '🧐',
  },
  {
    code: 'RATE_25',
    title: 'Palato Raffinato',
    description: 'Rate 25 different pizzerias.',
    icon: '👌',
  },
  {
    code: 'RATE_50',
    title: 'Giudice Supremo',
    description: 'Rate 50 different pizzerias.',
    icon: '⚖️',
  },
  {
    code: 'RATE_100',
    title: 'Oracolo del Sapore',
    description: 'Rate 100 different pizzerias.',
    icon: '🔮',
  },
  // 5-star rating achievements
  {
    code: 'FIVE_STAR_1',
    title: 'La Perfezione!',
    description: 'Give a 5-star rating.',
    icon: '⭐',
  },
  {
    code: 'FIVE_STAR_10',
    title: 'Cercatore di Eccellenza',
    description: 'Give 10 5-star ratings.',
    icon: '🌟',
  },
  {
    code: 'FIVE_STAR_25',
    title: 'Collezionista di Stelle',
    description: 'Give 25 5-star ratings.',
    icon: '✨',
  },
  {
    code: 'FIVE_STAR_50',
    title: 'Costellazione di Gusto',
    description: 'Give 50 5-star ratings.',
    icon: '🌌',
  },
  // Review-based achievements (based on description field)
  {
    code: 'REVIEW_1',
    title: 'Prima Recensione',
    description: 'Write your first review for a pizzeria.',
    icon: '📝',
  },
  {
    code: 'REVIEW_10',
    title: 'Cronista Culinario',
    description: 'Write 10 pizzeria reviews.',
    icon: '📰',
  },
  {
    code: 'REVIEW_25',
    title: 'Autore di Best-seller',
    description: 'Write 25 pizzeria reviews.',
    icon: '📚',
  },
  // Country-based achievements
  {
    code: 'ITALY_VISIT',
    title: 'Ritorno a Casa',
    description: 'Visit a pizzeria in Italy.',
    icon: '🛵',
  },
  {
    code: 'INTERNATIONAL_3',
    title: 'Giramondo',
    description: 'Visit pizzerias in 3 different countries.',
    icon: '🌍',
  },
  {
    code: 'INTERNATIONAL_5',
    title: 'Esploratore Globale',
    description: 'Visit pizzerias in 5 different countries.',
    icon: '🗺️',
  },
  {
    code: 'INTERNATIONAL_10',
    title: 'Mappamondo del Gusto',
    description: 'Visit pizzerias in 10 different countries.',
    icon: '🌐',
  },
];

export async function seedAchievements() {
  console.log('Start seeding achievements...');
  const existingAchievementCodes = await prisma.achievement
    .findMany({
      select: { code: true },
    })
    .then((achievements) => {
      return new Set(achievements.map((a) => a.code));
    });

  const newAchievements = achievements.filter(
    (ach) => !existingAchievementCodes.has(ach.code),
  );

  if (newAchievements.length > 0) {
    const result = await prisma.achievement.createMany({
      data: newAchievements,
      skipDuplicates: true,
    });
    console.log(`Created ${result.count} new achievements`);
  } else {
    console.log('All achievements already exist in the database.');
  }
}
