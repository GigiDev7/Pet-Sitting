import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../config/config';
import { IUser, SitterService } from '../sitter.services';

@Component({
  selector: 'app-single-sitter-page',
  templateUrl: './single-sitter-page.component.html',
  styleUrls: ['./single-sitter-page.component.css'],
})
export class SingleSitterPageComponent implements OnInit {
  public sitter!: IUser;
  public imgUrl!: string;
  public isLoading: boolean = true;
  public starWidth!: string;

  onRatingClick(rating: number) {
    const { sitterId } = this.route.snapshot.params;
    this.sitterService.rateSitter(sitterId, rating).subscribe({
      next: (res: any) => {
        this.sitter = res;
        const starPercent = (this.sitter.avgRating / 5) * 100;
        const rounded = Math.round(starPercent / 10) * 10;
        this.starWidth = `${rounded}%`;
      },
    });
  }

  constructor(
    private route: ActivatedRoute,
    private sitterService: SitterService
  ) {}

  ngOnInit(): void {
    const { sitterId } = this.route.snapshot.params;
    this.sitterService.getSingleSitter(sitterId).subscribe({
      next: (res: any) => {
        this.sitter = res;
        this.imgUrl = `${BASE_URL}/${this.sitter.profileImage}`;
        this.isLoading = false;
        const starPercent = (this.sitter.avgRating / 5) * 100;
        const rounded = Math.round(starPercent / 10) * 10;
        this.starWidth = `${rounded}%`;
      },
    });
  }
}
