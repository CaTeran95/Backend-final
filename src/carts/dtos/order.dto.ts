import { OmitType } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateBrandDTO } from 'src/products/dtos/brand.dto';
import { CreateCustomerDTO } from 'src/users/dtos/customers.dto';
import { Status } from '../entities/order.entity';

class CreateOrderCustomerDTO extends OmitType(CreateCustomerDTO, [
  'password',
  'birthday',
]) {}

class CreateListProductDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly productID: string;

  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly images: string[];

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly brand: CreateBrandDTO;

  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @Min(0)
  readonly quantity: number;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @ValidateNested()
  readonly customer: CreateOrderCustomerDTO;

  @IsDate()
  @IsNotEmpty()
  readonly creationDate: Date;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  readonly list: CreateListProductDTO[];
}
