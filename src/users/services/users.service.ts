import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  create(data: CreateUserDTO) {
    const newUser = new this.usersModel(data);
    console.log('New user: ', newUser);
    return newUser.save();
  }

  findAll() {
    return this.usersModel.find();
  }

  async findOne(userID: string) {
    const user = await this.usersModel.findById(userID);
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    return user;
  }

  async checkUser(userEmail: string): Promise<User> {
    const user = await this.usersModel.findOne({ email: userEmail });
    return user;
  }

  async update(userID: string, changes: UpdateUserDTO) {
    const user = await this.usersModel.findByIdAndUpdate(
      userID,
      { $set: changes },
      { new: true },
    );
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    return user;
  }

  async delete(userID: string) {
    const user = await this.usersModel.findByIdAndDelete(userID);
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    return user;
  }
}
