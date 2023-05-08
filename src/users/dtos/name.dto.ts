import { IsNotEmpty, IsString } from "class-validator";

export class CreateNameDTO {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
