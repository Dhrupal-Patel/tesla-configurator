import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CarModelDetails, CarOption } from '../../car-interface';

interface StepData {
  step1?: CarModelDetails;
  step2?: CarOption;
}

@Injectable({ providedIn: 'root' })
export class StoreDataService {
  private stepDataSubject = new BehaviorSubject<StepData>({});
  stepData$: Observable<StepData> = this.stepDataSubject.asObservable();

  setData<T extends 'step1' | 'step2'>(step: T, data: StepData[typeof step]) {
    const currentData = this.stepDataSubject.getValue();
    currentData[step] = data;
    this.stepDataSubject.next(currentData);
  }

  getData<T extends 'step1' | 'step2'>(step: T): Observable<StepData[typeof step] | undefined> {
    return this.stepData$.pipe(
      map(data => (data ? data[step] : undefined))
    );
  }

  clearData() {
    this.stepDataSubject.next({});
  }
}
