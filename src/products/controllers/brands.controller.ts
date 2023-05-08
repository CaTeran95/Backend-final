import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll() {
    return this.brandsService.findAll();
  }

  @Get(':brandID')
  getOne(@Param('brandID', MongoIdPipe) brandID: string) {
    return this.brandsService.findOne(brandID);
  }

  @Post()
  create(@Body() payload: CreateBrandDTO) {
    return this.brandsService.create(payload);
  }

  @Put(':brandID')
  update(
    @Body() payload: UpdateBrandDTO,
    @Param('brandID', MongoIdPipe) brandID: string,
  ) {
    return this.brandsService.update(brandID, payload);
  }

  @Delete(':brandID')
  delete(@Param('brandID', MongoIdPipe) brandID: string) {
    return this.brandsService.delete(brandID);
  }
}
