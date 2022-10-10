import { Component, OnInit, Input } from '@angular/core';
import { BASE_URL } from 'src/app/config/config';
import { IUser } from 'src/app/sitter.services';

@Component({
  selector: 'app-sitter-card',
  templateUrl: './sitter-card.component.html',
  styleUrls: ['./sitter-card.component.css'],
})
export class SitterCardComponent implements OnInit {
  @Input() sitter!: IUser;

  public imageSrc!: string;
  public starWidth!: string;

  constructor() {}

  ngOnInit(): void {
    this.imageSrc = BASE_URL + '/' + this.sitter.profileImage;

    const starPercent = (this.sitter.avgRating / 5) * 100;
    const rounded = Math.round(starPercent / 10) * 10;
    this.starWidth = `${rounded}%`;
  }
}
