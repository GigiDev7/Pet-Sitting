import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/sitter.services';

@Component({
  selector: 'app-sitter-card',
  templateUrl: './sitter-card.component.html',
  styleUrls: ['./sitter-card.component.css'],
})
export class SitterCardComponent implements OnInit {
  @Input() sitter!: IUser;

  constructor() {}

  ngOnInit(): void {}
}
