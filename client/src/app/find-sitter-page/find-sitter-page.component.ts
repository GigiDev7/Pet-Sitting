import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-find-sitter-page',
  templateUrl: './find-sitter-page.component.html',
  styleUrls: ['./find-sitter-page.component.css'],
})
export class FindSitterPageComponent implements OnInit {
  public petVariants: string[] = ['Dogs', 'Cats', 'Birds', 'Fish', 'Horses'];

  public locationForm: FormGroup = new FormGroup({
    location: new FormControl(''),
  });

  public pets: string[] = [];

  onPetBoxClick(val: string) {
    if (this.pets.includes(val)) {
      this.pets = this.pets.filter((el) => el !== val);
    } else {
      this.pets.push(val);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
