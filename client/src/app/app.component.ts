import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NotificationService } from './notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isJoinModalShown!: boolean;
  isJoinFormShown!: boolean;
  notificationText!: string;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.isJoinModalShown.subscribe({
      next: (val) => (this.isJoinModalShown = val),
    });
    this.authService.isJoinFormShown.subscribe({
      next: (val) => (this.isJoinFormShown = val),
    });

    this.notificationService.notificationText.subscribe({
      next: (val) => (this.notificationText = val),
    });
  }
}
