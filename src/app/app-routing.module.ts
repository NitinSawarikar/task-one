import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : 'buy-now', component : BuyNowComponent},
  {path : 'dashBoard', component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
