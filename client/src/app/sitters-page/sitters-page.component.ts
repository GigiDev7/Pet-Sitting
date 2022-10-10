import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  toggleSelectedPetBox() {
    this.isSelectedPetBoxShown = !this.isSelectedPetBoxShown;
  }

  constructor(
    private sitterService: SitterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedPets = this.route.snapshot.queryParams['pets'].split(',');
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
