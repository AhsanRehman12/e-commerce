import { Controller, Get, Query, Post, Body, Req, UseInterceptors, UseGuards, Request, Patch, Delete, UploadedFile, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthenticatedRequest } from 'src/utils/user.interface';
import { ProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerProductImageConfig } from 'src/utils/file.upload';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProduct } from './dto/product.update.dto';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) { }
  @Get()
  SearchProductByName(@Query('name') name: string) {
    return this.productService.SearchProductByName(name);
  }
  @Get()
  GetAllProducts() {
    return this.productService.SearchProduct();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerProductImageConfig))
  CreateProduct(@Body() ProductData: ProductDto,@UploadedFile() file: Express.Multer.File, @Req() req: AuthenticatedRequest) {
    return this.productService.CreateProduct(ProductData, file, req.user.userId)
  }

  @Get('/:id')
  findProduct(@Request() req: AuthenticatedRequest) {
    return this.productService.searchProductOfUser(req.user.userId);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image', multerProductImageConfig))
  UpdateProduct(@Body() ProductData: UpdateProduct, @Param('id') id: string,@UploadedFile() file: Express.Multer.File,@Request() req:AuthenticatedRequest) {
    return this.productService.updateProduct(id, ProductData, file,req.user.userId)
  }

  @Delete('/:id')
  DeleteProduct(@Query('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.productService.deleteProduct(id, req.user.userId);
  }
}


