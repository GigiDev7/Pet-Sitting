import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountryService, ICountry } from '../auth/country.service';

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
  public countries: ICountry[] = [];

  onPetBoxClick(val: string) {
    if (this.pets.includes(val)) {
      this.pets = this.pets.filter((el) => el !== val);
    } else {
      this.pets.push(val);
    }
  }

  onLocationChange(e: Event) {
    const target = e.target as HTMLInputElement;

    this.countries = this.countryService.countries.filter((el) =>
      el?.country?.toLowerCase().includes(target.value.toLowerCase())
    );
  }

  onLocationClick(event: string) {
    this.locationForm.patchValue({
      location: event,
    });
    this.countries = [];
  }

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe();
  }
}
