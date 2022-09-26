import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICountry } from '../country.service';

@Component({
  selector: 'app-location-typeahead',
  templateUrl: './location-typeahead.component.html',
  styleUrls: ['./location-typeahead.component.css'],
})
export class LocationTypeaheadComponent implements OnInit {
  @Input() countries!: ICountry[];
  @Output() countrySelected = new EventEmitter<string>();

  onCountryClick(country: string) {
    this.countrySelected.emit(country);
  }

  constructor() {}

  ngOnInit(): void {}
}
