import { registerAs } from '@nestjs/config';

export default registerAs('accessToken', () => {
  return {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  };
});
