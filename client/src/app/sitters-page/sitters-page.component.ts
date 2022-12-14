import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public isLoading: boolean = true;

  toggleSelectedPetBox() {
    this.isSelectedPetBoxShown = !this.isSelectedPetBoxShown;
  }

  stopPropagate(e: Event) {
    e.stopPropagation();
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

  onPetCheck(event: Event) {
    this.isLoading = true;
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedPets.push(target.value);
      console.log(this.selectedPets);
    } else {
      this.selectedPets = this.selectedPets.filter((el) => el !== target.value);
    }
    this.router.navigate(['sitters'], {
      queryParams: {
        country: this.countrySearch,
        pets: this.selectedPets.join(','),
      },
    });
    //this.isLoading = false;
  }

  onSearchClick() {
    if (this.countrySearch === this.route.snapshot.queryParams['country']) {
      return;
    }
    this.isLoading = true;
    this.router.navigate(['sitters'], {
      queryParams: {
        country: this.countrySearch,
        pets: this.selectedPets.join(','),
      },
    });
  }

  constructor(
    private sitterService: SitterService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedPets = this.route.snapshot.queryParams['pets'].split(',');
    this.countrySearch = this.route.snapshot.queryParams['country'];

    if (!this.countryService.countries.length) {
      this.countryService.getCountries().subscribe();
    }

    /* this.sitterService.sitters.subscribe({
      next: (val) => {
        this.sitters = val;
        if (this.sitters.length) {
          this.isLoading = false;
        }
      },
    }); */

    this.route.queryParams.subscribe({
      next: (data) => {
        const { country, pets } = data;
        this.sitterService
          .getFilteredSitters(country, pets.split(','))
          .subscribe({
            next: (res) => {
              this.sitterService.sitters.next(res);
              this.isLoading = false;
              this.sitters = res;
            },
          });
      },
    });
  }
}
