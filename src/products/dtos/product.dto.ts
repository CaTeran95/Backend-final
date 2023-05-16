import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly images: string[];

  @IsNotEmpty()
  @Min(0)
  readonly stock: number;

  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly active: boolean;

  @IsNotEmpty()
  @IsString()
  readonly condition: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['images']),
) {}
// export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class UpdateProductImagesDTO {
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly add: string[];
  
  @IsUrl({}, { each: true })
  @IsNotEmpty()
  readonly remove: string[];
}

export class FilterProductsDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  brand: string;
  
  @IsOptional()
  category: string;
}
