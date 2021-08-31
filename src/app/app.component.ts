import { Component, OnInit } from '@angular/core';
import { AppService } from './app.component.service';
import { Hardware } from '../models/hardware';
import { Benchmark } from '../models/benchmark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  accelerateIsChecked: boolean = false;
  benchmarkIsChecked: boolean = false;
  onxChecked: boolean = false;
  openModal: boolean = false;
  tvmChecked: boolean = false;

  dropdownData: Map<String, Set<String>> = new Map();
  displayProviders: Map<String, String> = new Map();
  hardwareData: Map<String, Hardware[]> = new Map();

  instanceSelection: string = '';
  numTrials: string ='';
  providerSelection: string = '';
  runsPerTrial: string ='';

  datagridArr: Hardware[] = [];
  engine: any;
  hardwareDataArr: any;

  constructor(private appComponentService: AppService){}

  ngOnInit() {
    this.getHardwareInfo();
  }

  getHardwareInfo() {
    this.appComponentService.getHardware().subscribe(data => {
        this.hardwareDataArr = data;
        for(let item in data) {
          let dataArr = [data[item]];
          // takes name of provider received from backend and associates it with abbreviation for display
          if(data[item].provider == 'AWS') {
            this.displayProviders.set('Amazon Web Services', 'AWS');
          } else if (data[item].provider == 'GCP') {
            this.displayProviders.set('Google Cloud','GCP');
          } else if (data[item].provider == 'MA') {
            this.displayProviders.set('Microsoft Azure','MA');
          }
          this.hardwareData.set(item, dataArr);
        }
        this.setProviderDetails();
    });
  }

  // assign map of provider abbreviation with set of instances
  setProviderDetails() {
    // get provider, if already created, get set and push to set, otherwise add new set
    for(let item in this.hardwareDataArr) {
      let instanceSet: Set<String> = new Set();
      if(this.dropdownData.get(this.hardwareDataArr[item].provider)) {
        instanceSet = this.dropdownData.get(this.hardwareDataArr[item].provider)!;
        instanceSet.add(this.hardwareDataArr[item].instance);
        this.dropdownData.set(this.hardwareDataArr[item].provider, instanceSet);
      } else {
        instanceSet.add(this.hardwareDataArr[item].instance);
        this.dropdownData.set(this.hardwareDataArr[item].provider, instanceSet);
      }
    }
  }

  // get array of instances to display in html dropdowns
  getInstances(key: string): string[] {
    let instancesArr: any[] = [];
    // set of instances from abbreviations of providers
    let instancesSet: Set<String> = this.dropdownData.get(this.displayProviders.get(key));
    if (instancesSet) {
      for(let value of Array.from(instancesSet).values()) {
        instancesArr.push(value);
      }
    }
     return instancesArr;
  }

  // get array of providers to display in html drowdown
  getProviders(): string[] {
    let providersArr: any[] = Array.from(this.displayProviders.keys());
    return providersArr;
  }

  // add row of provider, instance, cpu, and memory to datagrid
  addRow(){
  // null check, then add row components
    if(this.instanceSelection && this.providerSelection) {
      for(let item in this.hardwareDataArr) {
        // search map of data to find the full data for provider and selection
        if(this.hardwareDataArr[item].provider === this.displayProviders.get(this.providerSelection)
          && this.hardwareDataArr[item].instance === this.instanceSelection) {
            this.datagridArr.push(this.hardwareDataArr[item]);
            this.clearInputs();
          }
      }
    }
  }

  clearInputs() {
    this.instanceSelection = '';
    this.providerSelection = '';
  }

  createBenchmarkObj() {
    let benchmarkToSend = new Benchmark(this.engine, this.datagridArr, this.numTrials, this.runsPerTrial);
    console.log(benchmarkToSend);
  }

  getEngine() {
    if(this.onxChecked) {
      this.engine='ONX';
    } else if (this.tvmChecked) {
      this.engine='TVM';
    } else if (this.onxChecked && this.tvmChecked) {
      this.engine=['ONX', 'TVM'];
    }
  }

  // checks all inputs are present to display octomize button in total runs pane
  checkAllValuesPresent(): boolean {
    this.getEngine();
    let allValuesPresent = false;
    if(this.numTrials && this.runsPerTrial && this.engine && this.datagridArr.length > 0) {
      allValuesPresent = true;
    }
    return allValuesPresent;
  }

  sendBenchmarkObj() {
    this.createBenchmarkObj();
    if((Number(this.numTrials) * Number(this.runsPerTrial)) <= 1000) {
      // make service call to /benchmark
    }
  }

}

/*
Next Steps:
  reset error status on datalists when inputs reset in modal
  make service call to /benchmark and send new Benchmark Object
  properly create object to send to /accelerate
  separate out #runs and runs/trial variables for accelerate and benchmark
 */
