import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as fs from 'fs';
import { exec } from 'child_process';
import { SystemResponseDto } from 'src/modules/system/dtos/outputs/system-response.dto';

@Injectable()
export class OSService {
  public exec(command: string, callback?: any): void {
    exec(command, callback);
  }

  public prepareData(): SystemResponseDto {
    return {
      idleCpu: this.getCpuUsage(),
      containerId: this.getContainerId(),
      hostname: os.hostname(),
      uptime: os.uptime(),
      memoryUsage: this.getMemoryUsage(),
      cpuCores: os.cpus().length,
    };
  }

  public getCpuUsage(): number {
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

  private getContainerId(): string {
    try {
      return fs.readFileSync('/proc/1/cpuset', 'utf8').trim().slice(8) || 'Not in container';
    } catch {
      return 'Not in container';
    }
  }

  private getMemoryUsage(): any {
    const totalMem = os.totalmem() / (1024 * 1024 * 1024);
    const freeMem = os.freemem() / (1024 * 1024 * 1024);
    const usedMem = totalMem - freeMem;

    return {
      total: Number(totalMem.toFixed()),
      free: Number(freeMem.toFixed()),
      used: Number(usedMem.toFixed()),
    };
  }
}
