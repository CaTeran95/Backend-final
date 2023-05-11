import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from '../services/carts.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Self } from 'src/auth/decorators/self.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';

@Controller('api/carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get()
  getAll() {
    return this.cartsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  getSelf(@Request() req) {
    const { cartID } = req.user;
    return this.cartsService.findOne(cartID);
  }

  @UseGuards(JwtAuthGuard)
  @Put('add/:productID')
  addProduct(
    @Param('productID', MongoIdPipe) productID: string,
    @Request() req,
  ) {
    const { cartID } = req.user;
    return this.cartsService.modifyProductQty(cartID, productID, 1);
  }

  @UseGuards(JwtAuthGuard)
  @Put('remove/:productID')
  removeProduct(
    @Param('productID', MongoIdPipe) productID: string,
    @Request() req,
  ) {
    const { cartID } = req.user;
    return this.cartsService.modifyProductQty(cartID, productID, -1);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:productID')
  deleteProduct(
    @Param('productID', MongoIdPipe) productID: string,
    @Request() req,
  ) {
    const { cartID } = req.user;
    return this.cartsService.deleteProduct(cartID, productID);
  }
}
