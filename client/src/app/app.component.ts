import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isJoinModalShown!: boolean;
  isJoinFormShown!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isJoinModalShown.subscribe({
      next: (val) => (this.isJoinModalShown = val),
    });
    this.authService.isJoinFormShown.subscribe({
      next: (val) => (this.isJoinFormShown = val),
    });
  }
}
