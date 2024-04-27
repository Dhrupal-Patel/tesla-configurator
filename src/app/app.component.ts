import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDataService } from './shared/services/storedata.service';
import { CarModelDetails, CarOption } from './car-interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="nav">
      <button id="step1" routerLink="/step1" routerLinkActive="active">Step 1: Model</button>
      <button id="step2" routerLink="/step2" routerLinkActive="active" [disabled]="step1Data === undefined">Step 2: Options</button>
      <button id="step3" routerLink="/step3" routerLinkActive="active" [disabled]="step2Data === undefined">Step 3: Summary</button>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  step1Data?: CarModelDetails;
  step2Data?: CarOption;

  constructor(private storeData: StoreDataService) {

  }

  ngOnInit() {
    this.storeData.getData('step1').subscribe((data) => {
      if(data)
      this.step1Data = data;
    });

    this.storeData.getData('step2').subscribe((data) => {
      if(data)
      this.step2Data = data;
    });
  }


}
