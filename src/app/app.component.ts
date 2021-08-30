import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from './app.component.service';
import { Hardware } from '../models/hardware';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, DoCheck {
  hardwareData: Map<String, Hardware[]> = new Map();
  openModal: boolean = false;
  accelerateIsChecked: boolean = false;
  benchmarkIsChecked: boolean = false;
  providerSelection: string = '';
  instanceSelection: string = '';
  instanceSelected: boolean = false;
  disabled = false;
  hardwareDataArr: any;
  dropdownData: Map<String, Set<String>> = new Map();
  displayProviders: Map<String, String> = new Map();
  datagridArr: Hardware[] = [];

  constructor(private appComponentService: AppService){}

  ngOnInit() {
    this.getHardwareInfo();
  }

  ngDoCheck() {
//     console.log(this.accelerateIsChecked);
//     console.log(this.providerSelection);
//     console.log(this.getProviders());
//     console.log(this.dropdownData);
//     console.log(this.getInstances(this.providerSelection));
//     this.setProviderDetails();
//     console.log(this.instanceOptions);
  }

//
//   onChange(newValue: any) {
//     console.log(this.providerSelection);
//     console.log(newValue);
//     this.providerSelection = newValue;
//     this.getInstances(this.providerSelection);
//   }

  getHardwareInfo() {
    this.appComponentService.getHardware().subscribe(data => {
        this.hardwareDataArr = data;
        console.log(this.hardwareDataArr);
        for(let item in data ) {
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
        console.log(this.hardwareData);
        this.setProviderDetails();
    });
  }

  // assign map of provider abbreviation with set of instances
  setProviderDetails() {
    // get provider, if already created, get set and push to set, otherwise add new set
    let instanceSet: Set<String> = new Set();
    for(let item in this.hardwareDataArr) {
      if(this.dropdownData.get(this.hardwareDataArr[item].provider)) {
        // get current set, and add new instance value
        let tempSet: Set<String> = new Set();
        tempSet = this.dropdownData.get(this.hardwareDataArr[item].provider)!;
        tempSet.add(this.hardwareDataArr[item].instance);
      } else {
        instanceSet.add(this.hardwareDataArr[item].instance);
        this.dropdownData.set(this.hardwareDataArr[item].provider, instanceSet);
        instanceSet = new Set();
      }
      console.log(this.dropdownData);
    }
//   console.log(this.hardwareData.entries());
//    if (this.selection != 'Select Provider') {
//        console.log(this.hardwareData.get(this.selection));
//    }
//    if (this.selection == 'Amazon Web Services') {
//       console.log(this.hardwareData.get('AWS'));
//    }
//     for (let [key, value] of this.hardwareData) {
// //       console.log(value);
//       for(let instance of value) {
// //         console.log(instance);
//         if (instance.provider === this.selection) {
//           console.log('the same!')
//         }
//       }
//     }
  }

  // get array of instances to display in dropdowns
  getInstances(key: string): string[] {
    let instancesArr: any[] = [];
    // set of instances from abbreviations of providers
    let instancesSet: Set<String> = this.dropdownData.get(this.displayProviders.get(key));
    console.log(instancesSet);
    if (instancesSet) {
      for(let value of Array.from(instancesSet).values()) {
        instancesArr.push(value);
      }
    }
     return instancesArr;
  }

  // get array of providers to display in drowdown
  getProviders(): string[] {
    let providersArr: any[] = Array.from(this.displayProviders.keys());
    return providersArr;
  }

  addRow(){
  // null check, then add row components
    if(this.instanceSelection && this.providerSelection) {
//       datagridArr.push(this.providerSelection, this.instanceSelection);
      console.log(this.datagridArr);
      for(let item in this.hardwareDataArr) {
        console.log(this.providerSelection);
        console.log(this.hardwareDataArr[item].provider);
        // search map of data to find the full data for provider and selection
        if(this.hardwareDataArr[item].provider === this.displayProviders.get(this.providerSelection)
          && this.hardwareDataArr[item].instance === this.instanceSelection) {
            console.log('match found!');
            this.datagridArr.push(this.hardwareDataArr[item]);
            console.log(this.datagridArr);
            this.clearInputs();
//             newRowHardware: Hardware = new Hardware(this.hardwareDataArr[item]);
//             console.log(newRowHardware);
          }
      }
    }
  }

  clearInputs() {
    this.instanceSelection = '';
    this.providerSelection = '';
  }

}
/*

Next Steps:
  reset errors on datalists when inputs reset
  create total runs pane with octomize button that sends data to backend
  1. properly create object to post to both accelerate and benchmark
  2.
 */
