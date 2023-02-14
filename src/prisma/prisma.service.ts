import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query',
        },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();

    // 미들웨어 적용
    this.$use(async (params, next) => {
      const startTime = Date.now();
      console.log('미들웨어 로그 : ', params);

      const result = await next(params);
      const endTime = Date.now();

      console.log(`##### 쿼리 소요 시간 : ${endTime - startTime}ms`);

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
