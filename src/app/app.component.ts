import { Component } from '@angular/core';
import { ConfigService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//

export class AppComponent {
  title = 'octoml-assessment';
  provider: String = '';
  //get providers
  //turn into iterable list & display in dropdown


//   configService: ConfigService;
//   config: ConfigService | undefined;
}

// showConfig() {
//   this.configService.getConfig()
//     .subscribe((data: Config) => {
//         hardware:data
// //         heroesUrl: data.heroesUrl,
// //         textfile:  data.textfile,
// //         date: data.date,
//     });
// }
