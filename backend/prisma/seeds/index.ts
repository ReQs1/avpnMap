import { seedAchievements } from './achievements.seed';
import { seedPizzerias } from './pizzerias.seed';
import { seedRanks } from './ranks.seed';

async function main() {
  await seedAchievements();
  await seedPizzerias();
  await seedRanks();
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
