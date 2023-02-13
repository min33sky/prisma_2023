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
        writer: {
          connect: {
            userId: payload.writerId,
          },
        },
      },
    });

    return newPost;
  }
}
