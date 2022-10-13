import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
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
        this.commentAdded.emit(res);
        this.comment = '';
        this.notificationService.showNotification('Comment added successfully');
      },
    });
  }

  constructor(
    private route: ActivatedRoute,
    private sitterService: SitterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}
}
