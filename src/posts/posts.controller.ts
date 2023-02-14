import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  async createPost(@Body() body) {
    const newPost = await this.postService.createPost(body);
    return newPost;
  }

  @Get()
  async getPostsWithPagination(
    @Query('page', ParseIntPipe) page: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    const posts = await this.postService.getPostsWithPagination(page, take);
    return posts;
  }
}
