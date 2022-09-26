import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-join-now-modal',
  templateUrl: './join-now-modal.component.html',
  styleUrls: ['./join-now-modal.component.css'],
})
export class JoinNowModalComponent implements OnInit {
  onCloseModalClick() {
    this.authService.closeJoinModal();
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
