import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-find-sitter-page',
  templateUrl: './find-sitter-page.component.html',
  styleUrls: ['./find-sitter-page.component.css'],
})
export class FindSitterPageComponent implements OnInit {
  locationForm: FormGroup = new FormGroup({
    location: new FormControl(''),
  });

  petsForm: FormGroup = new FormGroup({
    pets: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
