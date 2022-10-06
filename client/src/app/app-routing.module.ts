import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HelpFormComponent } from './help-page/help-form/help-form.component';
import { TrustSafetyPageComponent } from './trust-safety-page/trust-safety-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { HowItWorksPageComponent } from './how-it-works-page/how-it-works-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

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
  {
    path: 'how-it-works',
    component: HowItWorksPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
