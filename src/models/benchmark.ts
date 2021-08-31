import { Hardware } from './hardware';


export class Benchmark {
  public engine: string;
  public hardware: Hardware[];
  public numTrials: string;
  public runsPerTrial: string;


  constructor(engine: string, hardware: Hardware[], numTrials: string, runsPerTrial: string) {
    this.engine = engine;
    this.hardware = hardware;
    this.numTrials = numTrials;
    this.runsPerTrial = runsPerTrial;
  }
}
