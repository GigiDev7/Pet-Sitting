import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { BASE_URL } from './config/config';

interface IComment {
  _id: string;
  sitterId: string;
  comment: string;
  author: {
    _id: string;
    email: string;
    profileImage?: string;
    firstname: string;
  };
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
  totalComments: number;
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

  public getSingleSitter(sitterId: string, totalComments: number = 1) {
    return this.http.get(`${BASE_URL}/sitters/${sitterId}`, {
      params: {
        totalComments,
      },
    });
  }

  public rateSitter(sitterId: string, rating: number) {
    return this.http.post(`${BASE_URL}/ratings/${sitterId}`, { rating });
  }

  public addComment(sitterId: string, comment: string) {
    return this.http.post(`${BASE_URL}/comment/${sitterId}`, { comment });
  }

  public editComment(commentId: string, comment: string) {
    return this.http.patch(`${BASE_URL}/comment/${commentId}`, { comment });
  }
}
