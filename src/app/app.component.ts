import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from './app.component.service';
import { Hardware } from '../models/hardware';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//

export class AppComponent implements OnInit, DoCheck {
  title = 'octoml-assessment';
  provider: Set<String> = new Set();
  hardwareData: Map<String, Hardware[]> = new Map();
  instanceOptions: string[] = [];
  openModal: boolean = false;
  accelerateIsChecked: boolean = false;
  benchmarkIsChecked: boolean = false;
  providerSelection: string = 'Select Provider';
  instanceSelection: string = 'Select Instance';
  instanceSelected: boolean = false;
  disabled = false;
  providers: string[]  = ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure'];

  constructor(private appComponentService: AppService){}

  ngOnInit() {
    this.getHardwareInfo();
  }

  ngDoCheck() {
//     console.log(this.accelerateIsChecked);
    console.log(this.providerSelection);
    this.setProviderDetails();
  }


  onChange(newValue: any) {
    console.log(this.providerSelection);
    console.log(newValue);
    this.providerSelection = newValue;
  }

  getHardwareInfo() {
    this.appComponentService.getHardware().subscribe(data => {
        console.log(data);
        for(let item in data ) {
          let dataArr = [data[item]];
          // add unique providers to set to later use as values for dropdowns
          this.provider.add(data[item].provider);
          this.hardwareData.set(item, dataArr);
          this.instanceOptions.push(data[item].instance);
        }
        console.log(this.hardwareData);
        console.log(this.provider);


    });
        this.setProviderDetails();
  }

  // set dropdown values when provider is selected --> on change of dropdown provider
  setProviderDetails() {
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

  addRow() {
//     this.openModal = true;
  }

}


