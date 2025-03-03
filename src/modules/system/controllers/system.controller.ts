import { Controller, Get } from '@nestjs/common';
import { exec } from 'child_process';
import * as os from 'os';

@Controller({
  version: '1',
  path: 'system',
})
export class SystemController {
  @Get('start')
  public startLoad(): string {
    const idleCpu = this.getCpuUsage();

    if (idleCpu > 50) {
      exec('dd if=/dev/zero bs=100M count=500 | gzip | gzip -d  > /dev/null &');
      return 'Gerando carga na CPU!';
    }

    return 'Já está sob alta carga!';
  }

  @Get('stop')
  public stopLoad(): string {
    exec('killall gzip', (err) => {
      if (err) {
        return 'Erro ao parar a carga!';
      }
    });

    return 'Carga da CPU interrompida!';
  }

  @Get('status')
  public getCpuStatus(): any {
    const idleCpu = this.getCpuUsage();
    return { idleCpu };
  }

  private getCpuUsage(): number {
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;

    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalMs += cpu.times[type];
      }
      idleMs += cpu.times.idle;
    });

    return (idleMs / totalMs) * 100;
  }
}
