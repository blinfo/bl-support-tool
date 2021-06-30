import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
})
export class NotAuthorizedComponent implements OnInit {
  iFrameUrl = 'https://app.bjornlunden.se';

  constructor() { }

  ngOnInit(): void {
  }

}
