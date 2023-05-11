import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';
import { DatabaseModule } from './database/database.module';
import { MessagesModule } from './messages/messages.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import config from './config';
import { environments } from './environments';
import { RenderModule } from './render/render.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    CartsModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        MDB_DBNAME: Joi.string().required(),
        MDB_USER: Joi.string().required(),
        MDB_PASSWORD: Joi.string().required(),
        MDB_HOST: Joi.string().required(),
        MDB_PORT: Joi.number().required(),
        MDB_CONNECTION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        ADMIN_EMAIL: Joi.string().required(),
        ADMIN_EMAIL_PW: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    RenderModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
