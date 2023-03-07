import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorater';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res) {
    const category = await this.categoriesService.create(createCategoryDto);
    return category
    ? res.status(201).json({message: 'Category added successfully!', data: category})
    : res.status(400).json({message: 'Category not added!'});
  }

  @Get()
  async findAll(@Res() res) {
    const categories = await this.categoriesService.findAll();

    return categories
    ? res.status(201).json({message: 'Category list!', data: categories})
    : res.status(400).json({message: 'Category not found!'});
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const category = await this.categoriesService.findOne(id);

    return category
    ? res.status(201).json({message: 'Category detail!', data: category})
    : res.status(400).json({message: 'Category not found!'});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Res() res, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.update(id, updateCategoryDto);

    return category
    ? res.status(201).json({message: 'Category updated successfully!!', data: category})
    : res.status(400).json({message: 'Category not updated!'});
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    const category = await this.categoriesService.remove(id);

    return category
    ? res.status(201).json({message: 'Category deleted successfully!!', data: category})
    : res.status(400).json({message: 'Category not deleted!'});
  }
}
