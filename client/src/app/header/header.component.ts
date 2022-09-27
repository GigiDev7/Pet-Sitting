import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isProfileBoxOpen: boolean = false;
  public isLoggedIn: boolean = false;

  onJoinNowClick() {
    this.authService.openJoinModal();
  }

  toggleProfileBox() {
    this.isProfileBoxOpen = !this.isProfileBoxOpen;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) this.isLoggedIn = true;
  }
}
