import { Controller, Get, Inject } from '@nestjs/common';
import { OSService } from 'libs/os/os.service';
import { SystemResponseDto } from '../dtos/outputs/system-response.dto';

@Controller({
  version: '1',
  path: 'system',
})
export class SystemController {
  @Inject(OSService) private readonly $os: OSService;

  @Get('info')
  public getCpuStatus(): SystemResponseDto {
    return this.$os.prepareData();
  }
}
