import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { IUser, SitterService } from 'src/app/sitter.services';
import { BASE_URL } from 'src/app/config/config';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css'],
})
export class CommentBoxComponent implements OnInit {
  @Input() sitter!: IUser;
  public comment: string = '';
  @Output() commentAdded = new EventEmitter<IUser>();
  @Output() sitterUpdated = new EventEmitter<IUser>();
  baseUrl = BASE_URL;
  totalComments: number = 1;
  user!: IUser;
  editingComentId: string | null = null;

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

  onLoadMoreComments() {
    const { sitterId } = this.route.snapshot.params;
    this.totalComments++;
    this.sitterService.getSingleSitter(sitterId, this.totalComments).subscribe({
      next: (res: any) => {
        this.sitterUpdated.emit(res);
      },
    });
  }

  onEditClick(id: string, comment: string) {
    this.editingComentId = id;
    this.comment = comment;
  }

  constructor(
    private route: ActivatedRoute,
    private sitterService: SitterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
