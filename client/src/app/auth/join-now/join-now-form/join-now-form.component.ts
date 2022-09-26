import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CountryService, ICountry } from '../../country.service';

@Component({
  selector: 'app-join-now-form',
  templateUrl: './join-now-form.component.html',
  styleUrls: ['./join-now-form.component.css'],
})
export class JoinNowFormComponent implements OnInit, OnDestroy {
  public maxDateRestriction!: string;
  public passwordsMatchError: boolean = false;
  public countries: ICountry[] = [];

  public registerForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onCloseFormClick() {
    this.authService.closeJoinForm();
  }

  onLoginClick() {
    this.authService.closeJoinForm();
    this.router.navigate(['login']);
  }

  onCountryChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.value) {
      this.countries = [];
      return;
    }

    this.countries = this.countryService.countries.filter((el) =>
      el.country.toLowerCase().includes(target.value.toLowerCase())
    );
  }

  selectCountry(eventData: string) {
    this.registerForm.patchValue({
      country: eventData,
    });
    this.countries = [];
  }

  onRegisterFormSubmit() {
    const {
      firstname,
      lastname,
      dateOfBirth,
      location,
      email,
      password,
      confirmPassword,
    } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.passwordsMatchError = true;
      return;
    }

    this.passwordsMatchError = false;
    console.log(this.registerForm.value);
  }

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private countryService: CountryService
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

    this.countryService.getCountries().subscribe();
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow-y');
  }
}
