import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { CountryService, ICountry } from '../auth/country.service';
import { BASE_URL } from '../config/config';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  filePath!: string;
  imageForm!: FormGroup;
  @ViewChild('imageInput') imageInput!: ElementRef;
  isImageUpdating: boolean = false;
  countries: ICountry[] = [];
  passwordConfirmError: string = '';

  public profileForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    dateOfBirth: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    memberType: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  handleChange(e: Event) {
    const file = (e.target as HTMLInputElement).files![0];
    this.imageForm.get('img')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  handleImageUpload() {
    const file = this.imageInput.nativeElement.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    this.authService.uploadImage(formData).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.notificationService.showNotification(
          'Image uploaded successfully'
        );
      },
    });
  }

  onCountryChange(event: Event) {
    const target = event.target as HTMLInputElement;

    this.countries = this.countryService.countries.filter((el) =>
      el.country.toLowerCase().includes(target.value.toLowerCase())
    );
  }

  selectCountry(event: string) {
    this.profileForm.patchValue({
      country: event,
    });
    this.countries = [];
  }

  handleSubmit() {
    const { newPassword, confirmPassword } = this.profileForm.value;

    if (newPassword && newPassword !== confirmPassword) {
      this.passwordConfirmError = 'Passwords do not match';
      return;
    }

    if (newPassword && newPassword.length < 6) {
      this.passwordConfirmError = 'Password must be at least 6 characters';
      return;
    }

    const userData: any = {};
    const allFields = [
      'email',
      'firstname',
      'lastname',
      'dateOfBirth',
      'country',
      'city',
      'memberType',
      'newPassword',
    ];

    allFields.forEach((field) => {
      if (this.profileForm.get(field)?.touched) {
        if (field === 'newPassword') {
          userData['password'] = this.profileForm.get(field)?.value;
        } else {
          userData[field] = this.profileForm.get(field)?.value;
        }
      }
    });

    this.authService.updateUser(userData).subscribe({
      next: (res: any) => {
        const user = JSON.parse(localStorage.getItem('user')!);
        const newUser = {
          ...res,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        this.profileForm.patchValue({
          email: res.email,
          country: res.country,
          city: res.city,
          firstname: res.firstname,
          lastname: res.lastname,
          memberType: res.memberType,
          dateOfBirth: res.dateOfBirth.split('T')[0],
        });
        this.notificationService.showNotification(
          'Profile updated successfully'
        );
      },
    });
  }

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService,
    private notificationService: NotificationService
  ) {
    this.imageForm = this.fb.group({
      img: [null],
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);

    const {
      email,
      firstname,
      lastname,
      country,
      city,
      memberType,
      dateOfBirth,
    } = user;

    if (user.profileImage) {
      this.filePath = `${BASE_URL}/${user.profileImage}`;
      this.isImageUpdating = true;
    }

    this.profileForm.patchValue({
      email,
      country,
      city,
      firstname,
      lastname,
      memberType,
      dateOfBirth: dateOfBirth.split('T')[0],
    });

    this.countryService.getCountries().subscribe();
  }
}
