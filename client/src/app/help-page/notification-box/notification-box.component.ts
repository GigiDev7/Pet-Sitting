import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.css'],
})
export class NotificationBoxComponent implements OnInit {
  @Input() isSendingError!: boolean;
  @Output() closeNotification = new EventEmitter<boolean>();

  onCloseClick() {
    this.closeNotification.emit(false);
  }

  constructor() {}

  ngOnInit(): void {}
}
