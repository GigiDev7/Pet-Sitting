import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  filePath!: string;
  imageForm!: FormGroup;
  @ViewChild('imageInput') imageInput!: ElementRef;

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
      next: (res) => {
        console.log(res);
      },
    });
  }

  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.imageForm = this.fb.group({
      img: [null],
    });
  }

  ngOnInit(): void {}
}
