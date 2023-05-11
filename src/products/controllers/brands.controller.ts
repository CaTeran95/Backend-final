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
import { BrandsService } from '../services/brands.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brand.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

@Controller('api/brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Post()
  create(@Body() payload: CreateBrandDTO) {
    return this.brandsService.create(payload);
  }

  @Get()
  getAll() {
    return this.brandsService.findAll();
  }

  @Get(':brandID')
  getOne(@Param('brandID', MongoIdPipe) brandID: string) {
    return this.brandsService.findOne(brandID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Put(':brandID')
  update(
    @Body() payload: UpdateBrandDTO,
    @Param('brandID', MongoIdPipe) brandID: string,
  ) {
    return this.brandsService.update(brandID, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Delete(':brandID')
  delete(@Param('brandID', MongoIdPipe) brandID: string) {
    return this.brandsService.delete(brandID);
  }
}
