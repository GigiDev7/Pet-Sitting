import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService, ICountry } from '../auth/country.service';
import { IUser, SitterService } from '../sitter.services';

@Component({
  selector: 'app-sitters-page',
  templateUrl: './sitters-page.component.html',
  styleUrls: ['./sitters-page.component.css'],
})
export class SittersPageComponent implements OnInit {
  public sitters!: IUser[];
  public petVariants: string[] = ['Dogs', 'Cats', 'Birds', 'Fish', 'Horses'];
  public selectedPets!: string[];
  public isSelectedPetBoxShown: boolean = false;
  public countries: ICountry[] = [];
  public countrySearch: string = '';

  toggleSelectedPetBox() {
    this.isSelectedPetBoxShown = !this.isSelectedPetBoxShown;
  }

  onLocationChange(e: Event) {
    const target = e.target as HTMLInputElement;

    this.countries = this.countryService.countries.filter((el) =>
      el?.country?.toLowerCase().includes(target.value.toLowerCase())
    );
  }

  onLocationClick(event: string) {
    this.countrySearch = event;
    this.countries = [];
  }

  constructor(
    private sitterService: SitterService,
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.selectedPets = this.route.snapshot.queryParams['pets'].split(',');

    if (!this.countryService.countries.length) {
      this.countryService.getCountries().subscribe();
    }

    this.sitterService.sitters.subscribe({
      next: (val) => {
        this.sitters = val;
      },
    });
    if (!this.sitters.length) {
      this.route.queryParams.subscribe({
        next: (data) => {
          const { country, pets } = data;
          this.sitterService
            .getFilteredSitters(country, pets.split(','))
            .subscribe({
              next: (res) => {
                this.sitters = res;
              },
            });
        },
      });
    }
  }
}
