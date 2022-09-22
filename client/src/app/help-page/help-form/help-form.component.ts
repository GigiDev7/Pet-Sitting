import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpService } from '../help.service';

@Component({
  selector: 'app-help-form',
  templateUrl: './help-form.component.html',
  styleUrls: ['./help-form.component.css'],
})
export class HelpFormComponent implements OnInit {
  public helpForm: FormGroup = new FormGroup({
    questionAbout: new FormControl('Becoming a Member', [Validators.required]),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  public formErrors = {
    emailAddressError: '',
    subjectError: '',
    descriptionError: '',
  };

  public isNotificationBoxShown: boolean = false;
  public isSendingError: boolean = false;

  handleHelpFormSubmit = () => {
    this.formErrors.descriptionError = '';
    this.formErrors.emailAddressError = '';
    this.formErrors.subjectError = '';

    const isEmailValid = this.helpForm.get('emailAddress')?.valid;
    const isSubjectValid = this.helpForm.get('subject')?.valid;
    const isDescriptionValid = this.helpForm.get('description')?.valid;

    if (!isEmailValid || !isSubjectValid || !isDescriptionValid) {
      if (!isSubjectValid)
        this.formErrors.subjectError = 'Subject: cannot be blank';
      if (!isDescriptionValid)
        this.formErrors.descriptionError = 'Description: cannot be blank';
      if (!isEmailValid) {
        const emailVal = this.helpForm.get('emailAddress')?.value;
        if (!emailVal) {
          this.formErrors.emailAddressError = 'Email: cannot be blank';
        } else {
          this.formErrors.emailAddressError =
            'Email: is not properly formatted';
        }
      }

      return;
    }

    this.formErrors.descriptionError = '';
    this.formErrors.emailAddressError = '';
    this.formErrors.subjectError = '';

    const { questionAbout, emailAddress, subject, description } =
      this.helpForm.value;
    this.helpService
      .sendMessage(questionAbout, emailAddress, subject, description)
      .subscribe({
        next: (res) => {
          this.isSendingError = false;
          this.isNotificationBoxShown = true;
        },
        error: (err) => {
          console.log(err);
          this.isSendingError = true;
          this.isNotificationBoxShown = true;
        },
      });
  };

  handleNotificationClose(val: boolean) {
    this.isNotificationBoxShown = val;
  }

  constructor(private helpService: HelpService) {}

  ngOnInit(): void {}
}
