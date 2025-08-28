import * as path from 'path'
import { cloudinaryUpload } from './cloudinary';
export const UploadingImage = async (file:Express.Multer.File) => {
  if (file) {
    const uploadedFolder = path.join(process.cwd(), 'uploads')
    let image = path.join(uploadedFolder, file.filename);
    let uploadedImage = await cloudinaryUpload(image);
    return {uploadedImage,image};
  }else{
    return {message:'File Not Found'}
  }
}