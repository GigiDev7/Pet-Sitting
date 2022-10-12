import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-sitter-page',
  templateUrl: './single-sitter-page.component.html',
  styleUrls: ['./single-sitter-page.component.css'],
})
export class SingleSitterPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
  }
}
