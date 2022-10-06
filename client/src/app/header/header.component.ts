import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  public isProfileBoxOpen: boolean = false;
  public isLoggedIn: boolean = false;

  onJoinNowClick() {
    this.authService.openJoinModal();
  }

  toggleProfileBox() {
    this.isProfileBoxOpen = !this.isProfileBoxOpen;
  }

  onLogoutClick() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.authService
      .logout(user.accessToken, user.refreshToken)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          localStorage.removeItem('user');
          this.isProfileBoxOpen = false;
          this.isLoggedIn = false;
          this.router.navigate(['']);
        },
      });
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngDoCheck(): void {
    const user = localStorage.getItem('user');
    if (user) this.isLoggedIn = true;
  }

  ngOnInit(): void {}
}
