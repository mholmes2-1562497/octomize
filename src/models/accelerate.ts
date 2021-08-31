import { Hardware } from './hardware';


export class Accelerate {
  public engine: string;
  public hardware: Hardware;


  constructor(engine: string, hardware: Hardware) {
    this.engine = engine;
    this.hardware = hardware;
  }
}
