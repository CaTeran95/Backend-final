import { Module } from '@nestjs/common';
import { MessagesService } from './services/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './entities/message.entity';
import { MessageSchema } from './entities/message.entity';
import { MessagesGateway } from './gateway/messages.gateway';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
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
  ],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
