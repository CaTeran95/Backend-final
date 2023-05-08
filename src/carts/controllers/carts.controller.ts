import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CartsService } from '../services/carts.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  getAll() {
    return this.cartsService.findAll();
  }

  @Get(':cartID')
  getOne(@Param('cartID', MongoIdPipe) cartID: string) {
    return this.cartsService.findOne(cartID);
  }

  @Put(':cartID/add/:productID')
  addProduct(
    @Param('cartID', MongoIdPipe) cartID: string,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.cartsService.modifyProductQty(cartID, productID, 1);
  }
  
  @Put(':cartID/remove/:productID')
  removeProduct(
    @Param('cartID', MongoIdPipe) cartID: string,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.cartsService.modifyProductQty(cartID, productID, -1);
  }

  @Delete(':cartID/delete/:productID')
  deleteProduct(
    @Param('cartID', MongoIdPipe) cartID: string,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.cartsService.deleteProduct(cartID, productID);
  }
}
