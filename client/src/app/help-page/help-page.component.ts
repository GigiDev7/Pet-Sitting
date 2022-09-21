import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css'],
})
export class HelpPageComponent implements OnInit {
  public isCallModalOpen: boolean = false;

  openCallModal(): void {
    this.isCallModalOpen = true;
  }

  closeCallModal(): void {
    this.isCallModalOpen = false;
  }

  constructor() {}

  ngOnInit(): void {}
}
