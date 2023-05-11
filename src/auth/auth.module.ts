import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginStrategy } from './strategies/login.strategy';
import { RegisterStrategy } from './strategies/register.strategy';

import config from 'src/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { secret, expiresIn } = configService.jwt;
        return {
          global: true,
          secret,
          signOptions: { expiresIn },
        };
      },
      inject: [config.KEY],
    }),
    PassportModule,
  ],
  providers: [LoginStrategy, JwtStrategy, RegisterStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
