import { registerAs } from '@nestjs/config';

export default registerAs('JwtTokens', () => {
  return {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  };
});
