import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }

  async cloudinaryUpload(localFilePath: string) {
    try {
      const uploading = await cloudinary.uploader.upload(localFilePath.replace(/\\/g, '/'), {
        resource_type: 'auto'
      })
      return uploading.secure_url
    } catch (error) {
      console.error(error)
      fs.unlinkSync(localFilePath)
      return null
    }
  }
}
