import { Component, OnInit } from '@angular/core';
import { IUser, SitterService } from '../sitter.services';

@Component({
  selector: 'app-sitters-page',
  templateUrl: './sitters-page.component.html',
  styleUrls: ['./sitters-page.component.css'],
})
export class SittersPageComponent implements OnInit {
  public sitters!: IUser[];

  constructor(private sitterService: SitterService) {}

  ngOnInit(): void {
    this.sitterService.sitters.subscribe({
      next: (val) => {
        this.sitters = val;
      },
    });
  }
}
