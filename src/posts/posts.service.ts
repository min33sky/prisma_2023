import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 페이지네이션을 통해 게시글 목록을 가져옵니다.
   * @param page 페이지 번호
   * @param take 가져올 데이터 개수
   */
  async getPostsWithPagination(page: number, take: number) {
    const [count, posts] = await Promise.all([
      this.prisma.post.count(),
      this.prisma.post.findMany({
        skip: (page - 1) * take,
        take,
        orderBy: {
          postId: 'desc',
        },
      }),
    ]);

    return {
      currentPage: page,
      totalPages: Math.ceil(count / take),
      posts,
    };
  }

  async createPost(payload: Prisma.PostUncheckedCreateInput) {
    const result = await this.prisma.$transaction(async (ctx) => {
      // 유저가 있는지 확인
      const exUser = await ctx.user.findUnique({
        where: {
          userId: payload.writerId,
        },
      });

      if (!exUser) {
        throw new ForbiddenException('User not found');
      }

      return await ctx.post.create({
        data: {
          content: payload.content,
          writer: {
            connect: {
              userId: payload.writerId,
            },
          },
        },
      });
    });

    return result;
  }
}
