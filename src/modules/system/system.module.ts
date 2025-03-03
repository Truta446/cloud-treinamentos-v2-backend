import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { SystemController } from './controllers/system.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SystemController],
})
export class SystemModule {}
