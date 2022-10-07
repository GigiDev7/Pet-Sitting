import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { BASE_URL } from '../config/config';

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

  public profileForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
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
      },
    });
  }

  handleSubmit() {
    console.log(this.profileForm.dirty);
  }

  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.imageForm = this.fb.group({
      img: [null],
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);

    const { email, firstname, lastname, country, city, memberType } = user;

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
    });
  }
}
