import { Component } from '@angular/core';
import { StoreDataService } from '../shared/services/storedata.service';
import { CommonModule } from '@angular/common';
import { CarModelDetails, CarOption } from '../car-interface';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  step1Data?: CarModelDetails;
  step2Data?: CarOption;
  imageURlPath: string = 'https://interstate21.com/tesla-app/images/';
  constructor( private storeData: StoreDataService) { }

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
