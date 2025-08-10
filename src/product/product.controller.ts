import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }
  @Get()
  searchProductByName(@Query('name') name: string) {
    return this.productService.SearchProductByName(name);
  }
  @Get()
  GetAllProducts() {
    return this.productService.SearchProduct();
  }
}


