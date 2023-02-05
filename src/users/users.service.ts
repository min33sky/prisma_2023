import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(payload: Prisma.UserCreateInput) {
    const newUser = await this.prisma.user.create({
      data: {
        name: payload.name,
        email: faker.datatype.uuid(),
        profile: payload.profile,
        UserInfo: {
          create: {
            height: Math.floor(Math.random() * 100),
            address: faker.address.city(),
            weight: Math.floor(Math.random() * 100),
            phone: faker.phone.number(),
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

  async deleteUser(userId: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        userId,
      },
    });

    return deleteUser;
  }
}
