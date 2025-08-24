import { Injectable} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';
import { UpdateProduct } from './dto/product.update.dto';
import * as path from 'path';
import * as fs from 'fs'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>, private cloudinaryService: CloudinaryService) { }
  async findProductById(Id: string) {
    try {
      return await this.productModel.findById(Id)
    }
    catch (error) {
      return error;
    }
  }
  async SearchProductByName(name: string) {
    try {
      const product = await this.productModel.find({ name: { $regex: name, $options: 'i' } })
      return product
    } catch (error) {
      console.log(error)
    }
  }

  async CreateProduct(product: ProductDto, file: Express.Multer.File) {
    try {
      if (file) {
        const uploadedFolder = path.join(process.cwd(), 'uploads')
        let image = path.join(uploadedFolder, file.filename);
        let uploadedImage = await this.cloudinaryService.cloudinaryUpload(image);
        if (uploadedImage) {
          const Product = await this.productModel.create({ ...product, image: uploadedImage });
          fs.unlinkSync(image)
          return Product
        }
      }
    } catch (error) {
      return { success: false, message: 'Error occur creating product' }
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
      return { message: 'Error occur searching product' }
    }
  }
  async updateProduct(productId: string, updatedData: UpdateProduct, file: Express.Multer.File) {

    try {
      if (file) {
        const localPath = path.join('./uploads', file.filename)
        const imageUrl = await this.cloudinaryService.cloudinaryUpload(localPath);
        if (imageUrl) {
          const updateProduct = await this.productModel.findByIdAndUpdate(productId, { ...updatedData, image: imageUrl });
          return updateProduct;
        }
        fs.unlinkSync(localPath)
      }
      return { msg: 'Product Updated Successfully' }
    } catch (error) {
      console.log(error)
    }
  }
  async deleteProduct(productId: string, userId: string) {
    const product = await this.findProductById(productId);
    if (product?.userId !== new mongoose.Types.ObjectId(userId)) return { success: false, message: 'You are not able to delete this.' }
    try {
      const deleteProduct = await this.productModel.findById(productId)
      if (!deleteProduct) return { success: false, message: "Product Not Found" }
      if (deleteProduct.userId.toString() != userId) return { success: false, message: 'Your are not allowed to Delete the Product' }
      //deletingProduct
      await this.productModel.findByIdAndDelete(productId)
    } catch (error) {
      console.log(error)
    }
  }
}
