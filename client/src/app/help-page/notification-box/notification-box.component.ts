import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.css'],
})
export class NotificationBoxComponent implements OnInit {
  @Input() isSendingError!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
