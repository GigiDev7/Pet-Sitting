import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isJoinModalShown = new BehaviorSubject<boolean>(false);

  public closeJoinModal() {
    this.isJoinModalShown.next(false);
  }

  public openJoinModal() {
    this.isJoinModalShown.next(true);
  }
}
