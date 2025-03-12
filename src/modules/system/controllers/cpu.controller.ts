import { Controller, Get, Inject } from '@nestjs/common';
import { OSService } from 'libs/os/os.service';

@Controller({
  version: '1',
  path: 'cpu',
})
export class CPUController {
  @Inject(OSService) private readonly $os: OSService;

  @Get('start')
  public startLoad(): any {
    const idleCpu = this.$os.getCpuUsage();

    if (idleCpu > 50) {
      this.$os.exec('dd if=/dev/zero bs=100M count=500 | gzip | gzip -d  > /dev/null &');

      return { message: 'Gerando carga na CPU!' };
    }

    return { message: 'Já está sob alta carga!' };
  }

  @Get('stop')
  public stopLoad(): any {
    this.$os.exec('killall gzip', (err) => {
      if (err) {
        return { message: 'Erro ao parar a carga!' };
      }
    });

    return { message: 'Carga da CPU interrompida!' };
  }
}
