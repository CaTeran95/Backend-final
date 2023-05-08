import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBrandDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
  
  @IsNotEmpty()
  @IsUrl()
  readonly website?: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
