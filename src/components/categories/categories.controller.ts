import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryCreateDto } from 'src/dto/categories/categories.dto';
import { Category } from 'src/schema/categories/categories.schema';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService){}

    @Post()
    async create(@Body() createCategory: CreateCategoryCreateDto){
        return await this.categoriesService.create(createCategory)
    }
    @Get()
    async getCategories(@Req() req): Promise<Category[]> {
        return this.categoriesService.getCategories();
    }

    @Get('/statistics')
      async getCategoryStatistics() {
        return await this.categoriesService.getCategoryStatistics();
    }

    @Delete(':id')
    async deleteCategory(@Param('id') categoryId: string) {
      const result = await this.categoriesService.deleteCategory(categoryId);
      if (!result) throw new NotFoundException('Thể loại không tồn tại');
      return { message: 'Thể loại đã bị xóa và sản phẩm đã được di chuyển' };
    }
}
