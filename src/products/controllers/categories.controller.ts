import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

@Controller('api/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Post()
  create(@Body() payload: CreateCategoryDTO) {
    return this.categoriesService.create(payload);
  }

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryID')
  getOne(@Param('categoryID', MongoIdPipe) categoryID: string) {
    return this.categoriesService.findOne(categoryID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Put(':categoryID')
  update(
    @Body() payload: UpdateCategoryDTO,
    @Param('categoryID', MongoIdPipe) categoryID: string,
  ) {
    return this.categoriesService.update(categoryID, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Delete(':categoryID')
  delete(@Param('categoryID', MongoIdPipe) categoryID: string) {
    return this.categoriesService.delete(categoryID);
  }
}
