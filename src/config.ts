import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    base: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
    },
    mongo: {
      dbName: process.env.MDB_DBNAME,
      user: process.env.MDB_USER,
      password: process.env.MDB_PASSWORD,
      port: process.env.MDB_PORT,
      host: process.env.MDB_HOST,
      connection: process.env.MDB_CONNECTION,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    nodemailer: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_EMAIL_PW,
    },
  };
});
