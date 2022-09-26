import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isJoinModalShown = new BehaviorSubject<boolean>(false);
  public isJoinFormShown = new BehaviorSubject<boolean>(false);
  public memberType!: string;

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
}
