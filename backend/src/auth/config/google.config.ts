import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => {
  return {
    googleClient: process.env.GOOGLE_CLIENT,
    googleSecret: process.env.GOOGLE_SECRET,
    GoogleCallbackURL: process.env.GOOGLE_CALLBACK_URL,
  };
});
