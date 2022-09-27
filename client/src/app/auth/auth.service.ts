import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { BASE_URL } from '../config/config';

interface IRegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth: string;
  country: string;
  city: string;
  memberType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isJoinModalShown = new BehaviorSubject<boolean>(false);
  public isJoinFormShown = new BehaviorSubject<boolean>(false);
  public memberType!: string;

  constructor(private http: HttpClient) {}

  public closeJoinModal() {
    this.isJoinModalShown.next(false);
  }

  public openJoinModal() {
    this.isJoinModalShown.next(true);
  }

  public openJoinForm() {
    this.isJoinFormShown.next(true);
  }

  public closeJoinForm() {
    this.isJoinFormShown.next(false);
  }

  public register(formData: IRegisterData) {
    return this.http.post(`${BASE_URL}/user/register`, formData);
  }

  public login(email: string, password: string) {
    return this.http.post(`${BASE_URL}/user/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  public logout(accessToken: string, refreshToken: string) {
    return this.http.post(
      `${BASE_URL}/user/logout`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
