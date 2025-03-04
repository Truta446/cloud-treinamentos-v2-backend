import { Module } from '@nestjs/common';
import { SystemController } from './controllers/system.controller';
import { CPUController } from './controllers/cpu.controller';
import { OSModule } from 'libs/os/os.module';

@Module({
  imports: [OSModule],
  controllers: [SystemController, CPUController],
})
export class SystemModule {}
