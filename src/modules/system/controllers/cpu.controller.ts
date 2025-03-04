import { Controller, Get, Inject } from '@nestjs/common';
import { OSService } from 'libs/os/os.service';

@Controller({
  version: '1',
  path: 'cpu',
})
export class CPUController {
  @Inject(OSService) private readonly $os: OSService;

  @Get('start')
  public startLoad(): string {
    const idleCpu = this.$os.getCpuUsage();

    if (idleCpu > 50) {
      this.$os.exec(
        'dd if=/dev/zero bs=100M count=500 | gzip | gzip -d  > /dev/null &',
      );

      return 'Gerando carga na CPU!';
    }

    return 'Já está sob alta carga!';
  }

  @Get('stop')
  public stopLoad(): string {
    this.$os.exec('killall gzip', (err) => {
      if (err) {
        return 'Erro ao parar a carga!';
      }
    });

    return 'Carga da CPU interrompida!';
  }
}
