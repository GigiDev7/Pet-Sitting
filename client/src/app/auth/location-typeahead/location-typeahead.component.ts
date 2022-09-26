import { Component, OnInit, Input } from '@angular/core';
import { ICountry } from '../country.service';

@Component({
  selector: 'app-location-typeahead',
  templateUrl: './location-typeahead.component.html',
  styleUrls: ['./location-typeahead.component.css'],
})
export class LocationTypeaheadComponent implements OnInit {
  @Input() countries!: ICountry[];

  constructor() {}

  ngOnInit(): void {}
}
