import { OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

import { CreateNameDTO } from './name.dto';
import { CreateAddressDTO } from './address.dto';

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

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @Type(() => CreateAddressDTO)
  readonly address: CreateAddressDTO;

  @IsNotEmpty()
  @IsNumber()
  readonly personalID: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
