import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  public alreadyRated: number = 0;

  onRatingClick(rating: number) {
    const { sitterId } = this.route.snapshot.params;
    this.sitterService.rateSitter(sitterId, rating).subscribe({
      next: (res: any) => {
        this.sitter = res;
        const starPercent = (this.sitter.avgRating / 5) * 100;
        const rounded = Math.round(starPercent / 10) * 10;
        this.starWidth = `${rounded}%`;
        this.alreadyRated = rating;
      },
    });
  }

  onCommentAdded(event: IUser) {
    this.sitter = event;
  }

  onSitterUpdate(event: IUser) {
    this.sitter = event;
  }

  datesFilter(d: Date | null) {
    return true;
  }

  constructor(
    private route: ActivatedRoute,
    private sitterService: SitterService
  ) {
    this.datesFilter = (d: Date | null) => {
      const dates = this.sitter.bookedDates.map((el) =>
        new Date(el).toDateString()
      );

      return !dates.find((el) => el === d?.toDateString());
    };
  }

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
        const user = JSON.parse(localStorage.getItem('user')!);
        const existingRating = this.sitter.ratings.find(
          (el) => el.userId === user._id
        );
        if (existingRating && existingRating.rating) {
          this.alreadyRated = existingRating.rating;
        }
      },
    });
  }
}
