import { PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateNameDTO } from './name.dto';
// import { Role } from '../entities/user.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  @ValidateNested()
  readonly name: CreateNameDTO;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @IsNotEmpty()
  @IsString()
  readonly alias: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;

  // @IsEnum(Role)
  // @IsNotEmpty()
  // readonly role: Role;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
