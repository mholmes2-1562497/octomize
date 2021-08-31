export class Hardware {
  public provider: string;
  public instance: string;
  public cpu: number;
  public memory: number;


  constructor(provider: string, instance: string, cpu: number, memory: number) {
    this.provider = provider;
    this.instance = instance;
    this.cpu = cpu;
    this.memory = memory;
  }
}
