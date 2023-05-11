import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../entities/product.entity';
import { Model } from 'mongoose';
import {
  CreateProductDTO,
  UpdateProductDTO,
  UpdateProductImagesDTO,
} from '../dtos/product.dto';
import { CreateReviewDTO } from '../dtos/review.dto';
import { Name } from 'src/users/entities/name.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async findAll() {
    return this.productModel.find().populate('category').populate('brand');
  }

  async findOne(productID: string) {
    const product = await this.productModel
      .findById(productID)
      .populate('category')
      .populate('brand');
    if (!product)
      throw new NotFoundException(`Product #${productID} not found`);
    return product;
  }

  async update(productID: string, changes: UpdateProductDTO) {
    const product = await this.productModel.findByIdAndUpdate(
      productID,
      { $set: changes },
      { new: true },
    );
    if (!product)
      throw new NotFoundException(`Product #${productID} not found`);
    return product;
  }

  async delete(productID: string) {
    const product = await this.productModel.findByIdAndDelete(productID);
    if (!product)
      throw new NotFoundException(`Product #${productID} not found`);
    return product;
  }

  async addReview(productID: string, user: Name, review: CreateReviewDTO) {
    // const product = await this.productModel.findById(productID);
    const product = await this.findOne(productID);
    if (!product)
      throw new NotFoundException(`Product #${productID} not found`);
    product.reviews.push({ user, ...review });
    const updatedProduct = await product.save();
    return updatedProduct.reviews;
  }

  async updateProductImages(
    productID: string,
    imagesURLs: UpdateProductImagesDTO,
  ) {
    const product = await this.productModel.findById(productID);
    const { add, remove } = imagesURLs;
    if (!product)
      throw new NotFoundException(`Product #${productID} not found`);
    add?.forEach((image) => product.images.push(image));
    remove?.forEach((image) => product.images.pull(image));
    return product.save();
  }
}
