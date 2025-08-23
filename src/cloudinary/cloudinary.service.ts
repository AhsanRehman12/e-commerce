import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs'

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET')
    });
  }

  async cloudinaryUpload(localFilePath: string) {
    try {
      const uploading = await cloudinary.uploader.upload(localFilePath.replace(/\\/g, '/'), {
        resource_type: 'auto'
      })
      console.log(uploading)
      return uploading.url
    } catch (error) {
      console.log('uploading fail')
      fs.unlinkSync(localFilePath)
      return null
    }
  }
}
