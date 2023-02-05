import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  async createPost(@Body() body) {
    const newPost = await this.postService.createPost(body);
    return newPost;
  }
}
