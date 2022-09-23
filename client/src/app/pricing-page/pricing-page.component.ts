import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency-converter.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.css'],
})
export class PricingPageComponent implements OnInit {
  currency: string = 'USD';
  basicAmount: number = 129;
  standardAmount: number = 199;
  premiumAmount: number = 259;

  handleCurrencyChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const getBasic = this.curencyService.getCurency(
      this.currency,
      target.value,
      this.basicAmount
    );
    const getStandard = this.curencyService.getCurency(
      this.currency,
      target.value,
      this.standardAmount
    );
    const getPremium = this.curencyService.getCurency(
      this.currency,
      target.value,
      this.premiumAmount
    );
    forkJoin([getBasic, getStandard, getPremium]).subscribe({
      next: (res: any) => {
        this.basicAmount = Math.round(res[0].result);
        this.standardAmount = Math.round(res[1].result);
        this.premiumAmount = Math.round(res[2].result);
        this.currency = target.value;
      },
    });
  }

  constructor(private curencyService: CurrencyService) {}

  ngOnInit(): void {}
}
