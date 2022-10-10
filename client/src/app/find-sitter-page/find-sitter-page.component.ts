import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService, ICountry } from '../auth/country.service';
import { SitterService } from '../sitter.services';

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

  onSearchClick() {
    const { location } = this.locationForm.value;
    this.sitterService.getFilteredSitters(location, this.pets).subscribe({
      next: () => {
        this.router.navigate(['sitters']);
      },
    });
  }

  constructor(
    private countryService: CountryService,
    private sitterService: SitterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe();
  }
}
