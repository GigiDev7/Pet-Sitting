import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/config';
import { tap } from 'rxjs/operators';

export interface ICountry {
  country: string;
  city: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  public countries: ICountry[] = [];

  constructor(private http: HttpClient) {}

  public getCountries() {
    return this.http
      .get(`${BASE_URL}/countries`)
      .pipe(tap((res: any) => (this.countries = res)));
  }
}
