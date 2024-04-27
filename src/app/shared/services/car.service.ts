import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel, CarOptions } from '../../car-interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('models');
  }

  getOptions(id: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`/options/${id}`);
  }
}
