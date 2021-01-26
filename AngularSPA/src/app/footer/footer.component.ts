import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  latitude = 31.546304;
  longitude = 35.100120;

  constructor() { }

  ngOnInit(): void {
  }

}
