import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css'],
})
export class PriceCardComponent implements OnInit {
  @Input() type!: string;

  constructor() {}

  ngOnInit(): void {}
}
