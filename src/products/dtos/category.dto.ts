import { PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
