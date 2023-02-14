import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Provider } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      where: {
        AND: [
          {
            UserInfo: {
              weight: {
                lt: 80,
              },
            },
          },
        ],
      },
      select: {
        userId: true,
        name: true,
        UserInfo: {
          select: {
            weight: true,
            height: true,
          },
        },
      },
    });
  }

  async getUser(userId: number) {
    const exUser = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!exUser) {
      throw new NotFoundException('User not found');
    }

    return exUser;
  }

  async createUser(payload: Prisma.UserCreateInput) {
    const newUser = await this.prisma.user.create({
      data: {
        name: payload.name,
        email: faker.datatype.uuid(),
        profile: payload.profile,
        UserInfo: {
          create: {
            height: Math.floor(Math.random() * 100) + 100,
            address: faker.address.city(),
            weight: Math.floor(Math.random() * 100),
          },
        },
      },
      include: {
        UserInfo: true,
      },
    });

    return newUser;
  }

  async createUsers() {
    const data = Array(1000000)
      .fill(null)
      .map(() => ({
        name: faker.name.firstName().slice(0, 9),
        email: faker.datatype.uuid(),
        profile: faker.lorem.sentences(),
      }));

    const newUsers = await this.prisma.user.createMany({
      data,
      skipDuplicates: true,
    });

    return newUsers;
  }

  async updateUser(payload) {
    const newInfo = await this.prisma.userInfo.update({
      where: {
        userId: payload.userId,
      },
      data: {
        height: {
          set: Number(payload.height), //? 숫자와 관련된 부분은 직접 넣기보다는 Atomic 연산을 사용하는 것이 좋다. (트랜잭션 보장)
        },
      },
    });

    return newInfo;
  }

  async deleteUser(userId: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        userId,
      },
    });

    return deleteUser;
  }
}
