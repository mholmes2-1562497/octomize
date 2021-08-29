import { Component, OnInit } from '@angular/core';
import { AppService } from './app.component.service';
import { Hardware } from '../models/hardware';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//

export class AppComponent implements OnInit {
  title = 'octoml-assessment';
  provider: Set<String> = new Set();
  hardwareData: Map<String, Hardware[]> = new Map();
  newRow = [];
  openModal: boolean = false;
  options = {'option1': 'Test', 'option2': 'Test2'};
  selection: string = '';
  disabled = false;
  providers = ['Amazon Web Services', 'Google Cloud', 'Microsoft Azure'];
  //get providers
  //turn into iterable list & display in dropdown

  constructor(private appComponentService: AppService){}

  ngOnInit() {
    this.getHardwareInfo();
  }

  getHardwareInfo() {
    this.appComponentService.getHardware().subscribe(data => {
        console.log(data);
        for(let item in data ) {
          let dataArr = [data[item]];
          this.provider.add(data[item].provider);
          this.hardwareData.set(item, dataArr);
//           dataArr = [];
        }
        console.log(this.hardwareData);
        console.log(this.provider);
    });

  }

  setDropDownValues() {

  }

  addRow() {
//     this.openModal = true;
  }

}


