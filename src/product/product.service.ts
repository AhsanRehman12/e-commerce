import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) { }

  async SearchProductByName(name: string) {
    try {
      const product = await this.productModel.find({ name: { $regex: name, $options: 'i' } })
      return product
    } catch (error) {
      console.log(error)
    }
  }

  async CreateProduct(product: ProductDto) {
    try {
      const newProduct = await this.productModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error)
    }
  }

  async SearchProduct() {
    try {
      const products = await this.productModel.find()
      return products
    } catch (error) {
      console.log(error);
    }
  }
  async searchProductOfUser(id: string) {
    try {
      const products = await this.productModel.find({ userId: id })
      return products
    } catch (error) {

    }
  }
}
