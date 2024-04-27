import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { AuthService } from './shared/services/auth.service';


 export const routes: Routes = [
  {path : '' , redirectTo : '/step1' , pathMatch : 'full'},
  { path: 'step1', component: Step1Component },
  { path: 'step2', component: Step2Component, canActivate: [AuthService] },
  { path: 'step3', component: Step3Component, canActivate: [AuthService] },
  { path: '**', component: Step1Component, canActivate: [AuthService] }
];
