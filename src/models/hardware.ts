export class Hardware {
  public provider: string;
  public instance: string;
  public cpu: string;
  public memory: string;


  constructor(provider: string, instance: string, cpu: string, memory: string) {
    this.provider = provider;
    this.instance = instance;
    this.cpu = cpu;
    this.memory = memory;
  }
}
