import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() commentAdded = new EventEmitter<IUser>();

  onAddComment() {
    const { sitterId } = this.route.snapshot.params;
    this.sitterService.addComment(sitterId, this.comment).subscribe({
      next: (res: any) => {
        console.log(res);
        this.commentAdded.emit(res);
      },
    });
  }

  constructor(
    private route: ActivatedRoute,
    private sitterService: SitterService
  ) {}

  ngOnInit(): void {}
}
