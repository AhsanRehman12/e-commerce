import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) { }

  async CreateProduct(product: ProductDto) {
    try {
      console.log('eee')
      const newProduct = await this.productModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error)
    }
  }
}
