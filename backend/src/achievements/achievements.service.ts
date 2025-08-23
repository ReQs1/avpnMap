import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AchievementsService implements OnModuleInit {
  onModuleInit() {
    console.log('AchievementsService has been initialized.');
    // fetch every achievement & create map of (achievement_code, achievement_id)
  }

  // create function synchronizeAchievements that gets userId as a param, fetch user's visits and achievements
  // check which achievements user has and which should be awarded/removed (create sets with codes)
  // use synchronizeAchievements function in visits.service
}
