import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';
import { UpdateProduct } from './dto/product.update.dto';
import * as path from 'path';
import * as fs from 'fs'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { LoogerService } from 'src/looger/looger.service';
import { UploadingImage } from 'src/utils/UploadingImage';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>, private cloudinaryService: CloudinaryService, private loogerService: LoogerService) { }
  async findProductById(Id: string) {
    try {
      return await this.productModel.findById(Id)
    }
    catch (error) {
      this.loogerService.error(error);
      return error;
    }
  }
  async SearchProductByName(name: string) {
    try {
      const product = await this.productModel.find({ name: { $regex: name, $options: 'i' } })
      return product
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }

  async CreateProduct(product: ProductDto, file: Express.Multer.File) {
    try {
      const { uploadedImage, image } = await UploadingImage(file)
      if (uploadedImage) {
        const Product = await this.productModel.create({ ...product, image: uploadedImage });
        fs.unlinkSync(image)
        return Product
      }
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }

  async SearchProduct() {
    try {
      const products = await this.productModel.find()
      return products
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }
  async searchProductOfUser(id: string) {
    try {
      const products = await this.productModel.find({ userId: id })
      return products
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }
  async updateProduct(productId: string, updatedData: UpdateProduct, file: Express.Multer.File) {

    try {
      const localPath = path.join('./uploads', file.filename)
      const { uploadedImage } = await UploadingImage(file)
      if (uploadedImage) {
        const updateProduct = await this.productModel.findByIdAndUpdate(productId, { ...updatedData, image: uploadedImage },{new:true});
        return updateProduct;
      }
      fs.unlinkSync(localPath)
      return { msg: 'Product Updated Successfully' }
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }
  async deleteProduct(productId: string, userId: string) {
    const product = await this.findProductById(productId);
    if (product?.userId !== userId) return { success: false, message: 'You are not able to delete this.' }
    if (!product) return { success: false, message: "Product Not Found" }
    try {
      //deletingProduct
      await this.productModel.findByIdAndDelete(productId)
      return {message:'Product Deleted Successfully'}
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }
}
