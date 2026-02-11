import { 
  Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards 
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

// Kita buat DTO kecil di sini saja biar praktis
class CreateCategoryDto {
  @ApiProperty({ example: 'Kuliah', description: 'Nama Kategori' })
  name: string;
}

@ApiTags('Categories')
@ApiBearerAuth() 
@UseGuards(AuthGuard('jwt')) 
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Buat Kategori Baru' })
  create(@Req() req: any, @Body() request: CreateCategoryDto) {
    return this.categoriesService.createCategory(req.user, request);
  }

  @Get()
  @ApiOperation({ summary: 'Lihat Semua Kategori User' })
  findAll(@Req() req: any) {
    return this.categoriesService.getCategories(req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Nama Kategori' })
  update(
    @Req() req: any, 
    @Param('id', ParseIntPipe) id: number, 
    @Body() request: CreateCategoryDto
  ) {
    return this.categoriesService.updateCategory(req.user, id, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus Kategori' })
  remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(req.user, id);
  }
}