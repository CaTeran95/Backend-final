import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../entities/brand.entity';

import { Model } from 'mongoose';
import { CreateBrandDTO, UpdateBrandDTO } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
  ) {}

  async create(data: CreateBrandDTO) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async findAll() {
    return this.brandModel.find();
  }

  async findOne(brandID: string) {
    const brand = await this.brandModel.findById(brandID);
    if (!brand)
      throw new NotFoundException(`Brand #${brandID} not found`);
    return brand;
  }

  async update(brandID: string, changes: UpdateBrandDTO) {
    const brand = await this.brandModel.findByIdAndUpdate(brandID, { $set: changes }, { new: true });
    if (!brand)
      throw new NotFoundException(`Brand #${brandID} not found`);
    return brand;
  }

  async delete(brandID: string) {
    const brand = await this.brandModel.findByIdAndDelete(brandID);
    if (!brand)
      throw new NotFoundException(`Brand #${brandID} not found`);
    return brand;
  }
}
