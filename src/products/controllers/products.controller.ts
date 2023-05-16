import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
  UpdateProductImagesDTO,
} from '../dtos/product.dto';
import { CreateReviewDTO } from '../dtos/review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Self } from 'src/auth/decorators/self.decorator';

@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }

  @Get()
  getAll(@Query() params: FilterProductsDTO) {
    return this.productService.findAll(params);
  }

  @Get(':productID')
  getOne(@Param('productID', MongoIdPipe) productID: string) {
    return this.productService.findOne(productID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Put(':productID')
  update(
    @Body() payload: UpdateProductDTO,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.productService.update(productID, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Delete(':productID')
  delete(@Param('productID', MongoIdPipe) productID: string) {
    return this.productService.delete(productID);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':productID/review')
  addReview(
    @Body() payload: CreateReviewDTO,
    @Param('productID', MongoIdPipe) productID: string,
    @Request() req,
  ) {
    const { name } = req.user;
    return this.productService.addReview(productID, name, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Put(':productID/images')
  updateImages(
    @Body() updateImages: UpdateProductImagesDTO,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.productService.updateProductImages(productID, updateImages);
  }
}
