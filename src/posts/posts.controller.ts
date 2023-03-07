import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto, @Res() res) {
    const postData = {...createPostDto, user: req.user.userId}
    const post = await this.postsService.create(postData);
    return post 
    ? res.status(201).json({message: 'Post added successfully!', data: post})
    : res.status(400).json({message: "Post not added!"})
  }

  @Get()
  async findAll(@Res() res) {
    const posts = await this.postsService.findAll();

    return posts 
    ? res.status(201).json({message: 'Post list!', data: posts})
    : res.status(400).json({message: "Post list not found!"})
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
