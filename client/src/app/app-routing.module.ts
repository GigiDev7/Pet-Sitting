import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HelpFormComponent } from './help-page/help-form/help-form.component';
import { TrustSafetyPageComponent } from './trust-safety-page/trust-safety-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'help',
    component: HelpPageComponent,
    children: [{ path: 'send-message', component: HelpFormComponent }],
  },
  {
    path: 'trust-safety',
    component: TrustSafetyPageComponent,
  },
  {
    path: 'pricing',
    component: PricingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
