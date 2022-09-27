import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public loginError: string = '';

  onJoinNowClick() {
    this.authService.openJoinModal();
  }

  onLoginClick() {
    if (!this.loginForm.valid) {
      this.loginError = 'Please provide email and password';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          if (Array.isArray(err.error.message)) {
            this.loginError = err.error.message[0].msg;
          } else {
            this.loginError = err.error.message;
          }
        },
      });
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
