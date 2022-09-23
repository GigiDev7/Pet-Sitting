import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurency(from: string, to: string, amount: number) {
    return this.http.get(
      `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
      {
        headers: {
          apikey: environment.CURRENCY_API_KEY,
        },
      }
    );
  }
}
