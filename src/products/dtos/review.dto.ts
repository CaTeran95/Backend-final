import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsNotEmpty()
  @IsString()
  readonly comment: string;
}
