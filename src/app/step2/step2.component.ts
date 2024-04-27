import { Component } from '@angular/core';
import { StoreDataService } from '../shared/services/storedata.service';
import { CarService } from '../shared/services/car.service';
import { CarConfig, CarOption, CarOptions } from '../car-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  private optionSubscription!: Subscription;
  selectedCarOptions: CarOptions = {
    configs: [],
    towHitch: false,
    yoke: false
  };
  storedStep1Data = {
    model: '',
    color: ''
  }
  configSelected: CarConfig | undefined = {
    id: 1,
    description: '',
    range: 0,
    speed: 0,
    price: 0
  };
  imageURlPath: string = 'https://interstate21.com/tesla-app/images/';
  storedStep2Data: CarOption =  {
    configs: {
      id: 1,
      description: '',
      range: 0,
      speed: 0,
      price: 0
    },
    towHitch: false,
    yoke: false,
  }
  selectedtowHitch: boolean = false;
  selectedyoke: boolean = false;


  constructor(private carService: CarService, private storeData: StoreDataService) {}

  ngOnInit() {
    this.storeData.getData('step1').pipe(
      take(1)
    ).subscribe(data => {
      if (data === undefined) return;
      this.storedStep1Data = data;
    });
    this.getCarOptions(this.storedStep1Data.model);
  }

  getCarOptions(id: string) {
    this.optionSubscription = this.carService.getOptions(id).pipe(
      switchMap((options: CarOptions) => {
        this.selectedCarOptions = options;
        return this.storeData.getData('step2').pipe(take(1));
      })
    ).subscribe((data : any) => {
      if (data !== undefined) {
        const configData = this.selectedCarOptions.configs.find(option => option.id === data.configs.id);
        this.configSelected = (configData !== undefined) ? configData : this.selectedCarOptions.configs[0];
        this.selectedtowHitch = data.towHitch;
        this.selectedyoke = data.yoke;
      } else {
        this.configSelected = undefined;
      }
      // this.configChange();
    });
  }

  configChange() {
    this.storedStep2Data = {
      configs: (this.configSelected !== undefined)? this.configSelected : undefined,
      towHitch: this.selectedtowHitch,
      yoke: this.selectedyoke,
    }
    if (this.configSelected !== undefined) {
      this.storeData.setData('step2', this.storedStep2Data);
    }
  }

  ngOnDestroy(): void {
    if (this.optionSubscription) {
      this.optionSubscription.unsubscribe();
    }
  }
}
