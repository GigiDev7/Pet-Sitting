import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/sitter.services';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css'],
})
export class CommentBoxComponent implements OnInit {
  @Input() sitter!: IUser;

  constructor() {}

  ngOnInit(): void {}
}
