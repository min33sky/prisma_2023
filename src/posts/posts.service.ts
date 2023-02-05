import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(payload: Prisma.PostUncheckedCreateInput) {
    const newPost = await this.prisma.post.create({
      data: {
        content: payload.content,
        author: {
          connect: {
            userId: Math.ceil(Math.random() * 1000013),
          },
        },
      },
    });

    return newPost;
  }
}
