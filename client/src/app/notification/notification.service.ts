import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationText = new BehaviorSubject<string>('');

  public showNotification(notifText: string) {
    this.notificationText.next(notifText);

    setTimeout(() => {
      this.closeNotification();
    }, 2000);
  }

  public closeNotification() {
    this.notificationText.next('');
  }
}
