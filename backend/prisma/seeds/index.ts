import { seedAchievements } from './achievements.seed';
import { seedPizzerias } from './pizzerias.seed';

async function main() {
  await seedAchievements();
  await seedPizzerias();
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
