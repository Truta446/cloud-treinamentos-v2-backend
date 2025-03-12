export class SystemResponseDto {
  public idleCpu: number;
  public containerId: string;
  public hostname?: string | null;
  public uptime: number;
  public memoryUsage: any;
  public cpuCores: number;
}
