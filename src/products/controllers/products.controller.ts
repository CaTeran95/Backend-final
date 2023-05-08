import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateProductDTO,
  UpdateProductDTO,
  UpdateProductImagesDTO,
} from '../dtos/product.dto';
import { CreateReviewDTO } from '../dtos/review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Get(':productID')
  getOne(@Param('productID', MongoIdPipe) productID: string) {
    return this.productService.findOne(productID);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }

  @Put(':productID')
  update(
    @Body() payload: UpdateProductDTO,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.productService.update(productID, payload);
  }

  @Delete(':productID')
  delete(@Param('productID', MongoIdPipe) productID: string) {
    return this.productService.delete(productID);
  }

  @Put(':productID/review')
  addReview(
    @Body() payload: CreateReviewDTO,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.productService.addReview(productID, payload);
  }

  @Put(':productID/images')
  updateImages(
    @Body() updateImages: UpdateProductImagesDTO,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.productService.updateProductImages(productID, updateImages);
  }
}
