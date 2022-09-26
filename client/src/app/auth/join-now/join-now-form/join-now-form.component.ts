import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-join-now-form',
  templateUrl: './join-now-form.component.html',
  styleUrls: ['./join-now-form.component.css'],
})
export class JoinNowFormComponent implements OnInit, OnDestroy {
  onCloseFormClick() {
    this.authService.closeJoinForm();
  }

  onLoginClick() {
    this.authService.closeJoinForm();
    this.router.navigate(['login']);
  }

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow-y');
  }
}
