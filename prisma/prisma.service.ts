import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

type PrismaClientType = Omit<PrismaClient, '$connect' | '$disconnect'> & {
  $connect: () => Promise<void>;
  $disconnect: () => Promise<void>;
};

@Injectable()
export class PrismaService
  extends (PrismaClient as new () => PrismaClientType)
  implements OnModuleInit, OnModuleDestroy
{
  private softDeleteMiddleware: any = async (params, next) => {
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      return next({
        ...params,
        action: 'findFirst',
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null,
          },
        },
      });
    }

    if (params.action === 'findMany') {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deletedAt: null,
          },
        },
      });
    }

    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deletedAt: new Date(),
          },
        },
      });
    }

    return next(params);
  };

  public async onModuleInit(): Promise<void> {
    await this.$connect();

    this.$use(this.softDeleteMiddleware);
  }

  public async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
