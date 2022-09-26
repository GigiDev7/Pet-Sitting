import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-join-now-form',
  templateUrl: './join-now-form.component.html',
  styleUrls: ['./join-now-form.component.css'],
})
export class JoinNowFormComponent implements OnInit, OnDestroy {
  public maxDateRestriction!: string;

  public registerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onCloseFormClick() {
    this.authService.closeJoinForm();
  }

  onLoginClick() {
    this.authService.closeJoinForm();
    this.router.navigate(['login']);
  }

  onRegisterFormSubmit() {}

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');

    const yearDifference = new Date().getFullYear() - 18;
    let extraDayYears = 0;
    for (let i = yearDifference; i <= new Date().getFullYear(); i++) {
      if (i % 4 === 0) extraDayYears++;
    }
    const days = extraDayYears * 366 + (18 - extraDayYears) * 365;
    const maxDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    this.maxDateRestriction = `${maxDate.getFullYear()}-${
      maxDate.getMonth().toString().length === 1
        ? '0' + maxDate.getMonth()
        : maxDate.getMonth()
    }-${maxDate.getDate()}`;
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow-y');
  }
}
