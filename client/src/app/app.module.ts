import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HelpFormComponent } from './help-page/help-form/help-form.component';
import { NotificationBoxComponent } from './help-page/notification-box/notification-box.component';
import { TrustSafetyPageComponent } from './trust-safety-page/trust-safety-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { PriceCardComponent } from './pricing-page/price-card/price-card.component';
import { HowItWorksPageComponent } from './how-it-works-page/how-it-works-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { JoinNowModalComponent } from './auth/join-now/join-now-modal/join-now-modal.component';
import { JoinNowFormComponent } from './auth/join-now/join-now-form/join-now-form.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { LocationTypeaheadComponent } from './auth/location-typeahead/location-typeahead.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    HelpPageComponent,
    HelpFormComponent,
    NotificationBoxComponent,
    TrustSafetyPageComponent,
    PricingPageComponent,
    PriceCardComponent,
    HowItWorksPageComponent,
    LoginPageComponent,
    JoinNowModalComponent,
    JoinNowFormComponent,
    PrivacyPolicyPageComponent,
    LocationTypeaheadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
