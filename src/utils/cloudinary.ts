import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
const cloudinaryUpload = async (localFilePath: string) => {
  console.log(localFilePath, 'lll')
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


export { cloudinaryUpload }