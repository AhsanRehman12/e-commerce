import { Body, Controller, Post, Get, Request, UploadedFile, UseGuards, UseInterceptors, Delete, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProductDto } from 'src/product/dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/utils/user.interface';
import { UpdateProduct } from 'src/product/dto/product.update.dto';
import { multerProductImageConfig } from 'src/utils/file.upload';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Post('create-product')
  @UseInterceptors(FileInterceptor('image', multerProductImageConfig))
  createProduct(@Body() product: ProductDto, @UploadedFile() file: Express.Multer.File) {
    return this.userService.CreateProduct({ ...product, image: file?.filename })
  }

  @Get('my-product')
  @UseGuards(AuthGuard('jwt'))
  findProduct(@Request() req: AuthenticatedRequest) {
    return this.userService.findProduct(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-product/:id')
  deleteProduct(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.userService.deleteProduct(id, req.user.userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('update-product/:id')
  @UseInterceptors(FileInterceptor('image', multerProductImageConfig))
  updateProduct(@Body() updateData: UpdateProduct, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.userService.updateProduct(id, { ...updateData, image: file?.filename })
  }
}
