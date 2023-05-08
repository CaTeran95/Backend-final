import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(data: CreateCategoryDTO) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  async findAll() {
    return this.categoryModel.find();
  }

  async findOne(categoryID: string) {
    const category = await this.categoryModel.findById(categoryID);
    if (!category)
      throw new NotFoundException(`Category #${categoryID} not found`);
    return category;
  }

  async update(categoryID: string, changes: UpdateCategoryDTO) {
    const category = await this.categoryModel.findByIdAndUpdate(
      categoryID,
      { $set: changes },
      { new: true },
    );
    if (!category)
      throw new NotFoundException(`Category #${categoryID} not found`);
    return category;
  }

  async delete(categoryID: string) {
    const category = await this.categoryModel.findByIdAndDelete(categoryID);
    if (!category)
      throw new NotFoundException(`Category #${categoryID} not found`);
    return category;
  }
}
