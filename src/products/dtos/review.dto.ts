import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateNameDTO } from 'src/users/dtos/name.dto';

export class CreateReviewDTO {
  @IsNotEmpty()
  @ValidateNested()
  readonly customer: CreateNameDTO;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsNotEmpty()
  @IsString()
  readonly comment: string;
}
