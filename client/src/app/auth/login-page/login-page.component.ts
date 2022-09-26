import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  onJoinNowClick() {
    this.authService.openJoinModal();
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
