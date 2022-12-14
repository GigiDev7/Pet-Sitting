import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-how-it-works-page',
  templateUrl: './how-it-works-page.component.html',
  styleUrls: ['./how-it-works-page.component.css'],
})
export class HowItWorksPageComponent implements OnInit {
  onJoinNowClick() {
    this.authService.openJoinModal();
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
