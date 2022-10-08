import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pet-box',
  templateUrl: './pet-box.component.html',
  styleUrls: ['./pet-box.component.css'],
})
export class PetBoxComponent implements OnInit {
  @Input() iconClass!: string;
  @Input() pet!: string;
  @Input() pets!: string[];

  activeClass: string = 'bg-teal-700';

  constructor() {}

  ngOnInit(): void {}
}
