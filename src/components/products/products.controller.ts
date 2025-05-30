import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/dto/product/products.dto';
import {
  CreateProductSwaggerDto,
  UpdateProductSwaggerDto,
} from 'src/dto/product/products-swagger.dto';
import { ProductService } from './products.service';
import { Product } from 'src/schema/products/products.schema';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/media/upload/upload.service';
import { Roles } from '../auth/guards/roles.decorator';

@ApiTags('products')
@ApiExtraModels(CreateProductSwaggerDto, UpdateProductSwaggerDto)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductSwaggerDto })
  async uploadFile(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Body() createProductDto: CreateProductDto,
  ) {
    let thumbnailUrl = '';
    const imageUrls: string[] = [];

    if (files.thumbnail && files.thumbnail.length > 0) {
      thumbnailUrl = await this.uploadService.upload(
        files.thumbnail[0].originalname,
        files.thumbnail[0].buffer,
      );
      thumbnailUrl = thumbnailUrl.replace(/\s/g, '%20');
    }

    if (files.images && files.images.length > 0) {
      for (const img of files.images) {
        let imgUrl = await this.uploadService.upload(
          img.originalname,
          img.buffer,
        );
        imgUrl = imgUrl.replace(/\s/g, '%20');
        imageUrls.push(imgUrl);
      }
    }
    createProductDto.thumbnail = thumbnailUrl;
    createProductDto.images = imageUrls;

    return this.productService.createProduct(createProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Patch(':id')
  @Roles(1)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProductSwaggerDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ) {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại!');
    }

    if (updateProductDto.deleteImages) {
      const deleteImages = Array.isArray(updateProductDto.deleteImages)
        ? updateProductDto.deleteImages
        : JSON.parse(updateProductDto.deleteImages);

      product.images = product.images.filter((img) => !deleteImages.includes(img));
    }

    if (files.images && files.images.length > 0) {
      const newImageUrls = await Promise.all(
        files.images.map(async (img) => {
          const imgUrl = await this.uploadService.upload(
            img.originalname,
            img.buffer,
          );
          return imgUrl.replace(/\s/g, '%20');
        }),
      );
      product.images = newImageUrls;
    } else if (files.images && files.images.length === 0) {
      product.images = [];
    }

    if (updateProductDto.imagesString && Array.isArray(updateProductDto.imagesString)) {
      product.images = [...product.images, ...updateProductDto.imagesString];
    }

    if (files.thumbnail && files.thumbnail.length > 0) {
      const thumbnailUrl = await this.uploadService.upload(
        files.thumbnail[0].originalname,
        files.thumbnail[0].buffer,
      );
      product.thumbnail = thumbnailUrl.replace(/\s/g, '%20');
    }

    delete updateProductDto.images;
    delete updateProductDto.thumbnail;
    Object.assign(product, updateProductDto);

    return this.productService.updateProduct(id, product);
  }

  @Get('/category/:slug')
  async getProductsByCategorySlug(
    @Param('slug') slug: string,
  ): Promise<Product[]> {
    return this.productService.findProductsByCategorySlug(slug);
  }

  @Get('/categories/:id')
  async getProductsByCategory(@Param('id') categoryId: string) {
    return this.productService.findByCategory(categoryId);
  }

  @Get('/total')
  async getTotalProduct() {
    return this.productService.getTotalProduct();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Get('search/key')
  async search(@Query('name') name: string): Promise<Product[]> {
    return this.productService.findByName(name);
  }

  @Get('top/selling')
  async getTopSellingProducts(): Promise<Product[]> {
    return this.productService.getTopSellingProducts();
  }

  @Get('detail/:slug')
  async getProductBySlug(@Param('slug') slug: string): Promise<Product> {
    return await this.productService.findBySlug(slug);
  }
}
