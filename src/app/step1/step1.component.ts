import { Component } from '@angular/core';
import { CarColor, CarModel, CarModelDetails } from '../car-interface';
import { CarService } from '../shared/services/car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreDataService } from '../shared/services/storedata.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  private modelsSubscription!: Subscription;
  modelsData: CarModel[] = [];
  colorsData: CarColor[] =  [];
  selectedModel: string = '';
  selectedColor: string = '';
  imageURlPath: string = 'https://interstate21.com/tesla-app/images/';
  storedStep1Data: CarModelDetails = {
    model: '',
    color: '',
    modelDescription: '',
    colorDetails: undefined
  }
  modelDescription: string = '';
  colorDetails?: CarColor;

  constructor(private carService: CarService, private storeData: StoreDataService) { }

  ngOnInit() {
    this.getCarModels();
  }

  getCarModels() {
   this.modelsSubscription = this.carService.getModels().pipe(
      switchMap(models => {
        this.modelsData = models;
        return this.storeData.getData('step1');
      })
    ).subscribe(data => {
      if (data === undefined) return;
      this.storedStep1Data = data
      if (this.storedStep1Data.model !== '') {
        this.selectedModel = this.storedStep1Data.model;
        this.selectedColor = this.storedStep1Data.color;
        this.setColors(this.selectedModel);
      }
    });
  }

  setColors (model: string) {
    if (model === '') return [];
    let modelColor = this.modelsData.filter(object => object.code === model);
    if(modelColor.length) {
      this.colorsData = modelColor[0].colors;
    }
    return modelColor;
  }

  carModelChange() {
    let modelColor = this.setColors(this.selectedModel);
    if(modelColor.length) {
      this.modelDescription = modelColor[0].description;
      if (this.colorsData) {
        this.selectedColor = this.colorsData[0].code;
      }
    } else {
      this.selectedColor = '';
    }
    this.storeStepData();
  }

  carColorChange() {
    this.storeStepData();
  }

  storeStepData() {
    if (this.selectedColor !== undefined){
      const colorData = this.colorsData.filter(object => object.code === this.selectedColor);
       this.colorDetails = colorData[0];
    }
    this.storedStep1Data = {
      model: this.selectedModel,
      color: this.selectedColor,
      modelDescription: this.modelDescription,
      colorDetails: this.colorDetails
    }
    this.storeData.setData('step1', this.storedStep1Data);
    this.storeData.setData('step2', undefined);
  }

  ngOnDestroy(): void {
    if (this.modelsSubscription) {
      this.modelsSubscription.unsubscribe();
    }
  }
}
