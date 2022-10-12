import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { BASE_URL } from './config/config';

interface IComment {
  comment: string;
  userId: string;
}

interface IRating {
  rating: number;
  userId: string;
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  dateOfBirth: string;
  email: string;
  memberType: string;
  avgRating: number;
  comments: IComment[];
  ratings: IRating[];
  pets: string[];
  profileImage?: string;
  mobile?: string;
  bio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SitterService {
  sitters = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) {}

  public getFilteredSitters(country: string, pets: string[]) {
    return this.http
      .get(`${BASE_URL}/sitters?country=${country}&pets=${pets.join(',')}`)
      .pipe(tap((res: any) => this.sitters.next(res)));
  }

  public getSingleSitter(sitterId: string) {
    return this.http.get(`${BASE_URL}/sitters/${sitterId}`);
  }
}
