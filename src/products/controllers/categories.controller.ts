import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryID')
  getOne(@Param('categoryID', MongoIdPipe) categoryID: string) {
    return this.categoriesService.findOne(categoryID);
  }

  @Post()
  create(@Body() payload: CreateCategoryDTO) {
    return this.categoriesService.create(payload);
  }

  @Put(':categoryID')
  update(
    @Body() payload: UpdateCategoryDTO,
    @Param('categoryID', MongoIdPipe) categoryID: string,
  ) {
    return this.categoriesService.update(categoryID, payload);
  }

  @Delete(':categoryID')
  delete(@Param('categoryID', MongoIdPipe) categoryID: string) {
    return this.categoriesService.delete(categoryID);
  }
}
