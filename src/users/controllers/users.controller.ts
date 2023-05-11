import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../entities/user.entity';
import { Self } from 'src/auth/decorators/self.decorator';
import { RolePipe } from 'src/common/role.pipe';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    const newUser = await this.usersService.create(payload);
    if (!newUser)
      throw new BadRequestException(
        `Email ${payload.email} already has been registered`,
      );
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  generateOrder(@Request() req) {
    const { userID } = req.user;
    return this.usersService.addOrder(userID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  getOrders(@Request() req) {
    const { userID } = req.user;
    return this.usersService.getOrders(userID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Self('userID')
  @Get('/:userID')
  getOne(@Param('userID', MongoIdPipe) userID: string) {
    return this.usersService.findOne(userID);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() payload: UpdateUserDTO, @Request() req) {
    const { userID } = req.user;
    return this.usersService.update(userID, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Put('favorites/:productID')
  setFavorites(
    @Param('productID', MongoIdPipe) productID: string,
    @Request() req,
  ) {
    const { userID } = req.user;
    return this.usersService.setFavorite(userID, productID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN)
  @Put(':userID/role/:role')
  setUserStatus(
    @Param('userID', MongoIdPipe) userID: string,
    @Param('role', RolePipe) role: Role,
  ) {
    return this.usersService.setUserRole(userID, role);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('orders/:orderID')
  deleteOrder(@Param('orderID', MongoIdPipe) orderID: string, @Request() req) {
    const { userID } = req.user;
    return this.usersService.deleteOrder(userID, orderID);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN)
  @Self('userID')
  @Delete('/:userID')
  delete(@Param('userID', MongoIdPipe) userID: string) {
    return this.usersService.delete(userID);
  }
}
