import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDTO {
  @IsMongoId()
  @IsNotEmpty()
  emitter: string;
  
  @IsMongoId()
  @IsNotEmpty()
  receiver: string;

  @IsNotEmpty()
  @IsString()
  body: string; 
}