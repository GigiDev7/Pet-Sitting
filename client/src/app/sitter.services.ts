import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL } from './config/config';

@Injectable({
  providedIn: 'root',
})
export class SitterService {
  constructor(private http: HttpClient) {}

  public getFilteredSitters(country: string, pets: string[]) {
    this.http.get(
      `${BASE_URL}/sitters?country=${country}&pets=${pets.join(',')}`
    );
  }
}
