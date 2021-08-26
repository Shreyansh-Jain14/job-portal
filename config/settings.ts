import { registerAs } from '@nestjs/config';

// all your application settings go here.
export default registerAs('settings', () => ({

    resetExpiresIn: parseInt(process.env.PASSWORD_RESET_CODE_EXPIRES_MINUTE) || 5,
}));

