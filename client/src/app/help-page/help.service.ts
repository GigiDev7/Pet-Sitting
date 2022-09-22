import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(private http: HttpClient) {}

  public sendMessage(
    questionAbout: string,
    email: string,
    subject: string,
    description: string
  ) {
    return this.http.post(`${BASE_URL}/user/help-message`, {
      questionAbout,
      email,
      subject,
      description,
    });
  }
}
