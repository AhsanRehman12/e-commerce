import { Body, Controller, Post, Get, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/utils/user.interface';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Post('create-product')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const prefixes = Date.now() + '-' + Math.round(Math.random() * 1000);
        callback(null, prefixes + extname(file.originalname));
      }
    })
  }))
  createProduct(@Body() product: ProductDto, @UploadedFile() file: Express.Multer.File) {
    return this.userService.CreateProduct({ ...product, image: file?.filename })
  }

  @Get('my-product')
  @UseGuards(AuthGuard('jwt'))
  findProduct(@Request() req: AuthenticatedRequest) {
    return this.userService.findProduct(req.user.userId);
  }
}
