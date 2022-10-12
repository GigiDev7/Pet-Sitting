import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser, SitterService } from 'src/app/sitter.services';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css'],
})
export class CommentBoxComponent implements OnInit {
  @Input() sitter!: IUser;
  public comment: string = '';

  onAddComment() {
    const { sitterId } = this.route.snapshot.params;
    console.log(sitterId, this.comment);
  }

  constructor(
    private route: ActivatedRoute,
    private sitterService: SitterService
  ) {}

  ngOnInit(): void {}
}
