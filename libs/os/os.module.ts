import { Module } from '@nestjs/common';
import { OSService } from './os.service';

@Module({
  providers: [OSService],
  exports: [OSService],
})
export class OSModule {}
