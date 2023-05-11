import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { MessageOrigin } from '../entities/message.entity';
import { PickType } from '@nestjs/swagger';

export class CreateMessageDTO {
  @IsNotEmpty()
  @IsString()
  body: string;
}
