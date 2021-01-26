import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  items: any[] = [
    {
      "colorA": "rgba(0, 0, 0,0.5)",
      "colorB": "rgba(0, 0, 0,0.8)",
      "titleA": "all hardware you need in one place",
      "titleB": "all products is original and new",
      "img": "assets/imgonline-com-ua-compressed-eaUBQN3ywnhNClE.jpg"
    },
    {
      "colorA": "rgba(0, 0, 0,0.5)",
      "colorB": "rgba(0, 0, 0,0.8)",
      "titleA": "our team is available 24 out for support",
      "titleB": "we make our customer happy",
      "img": "assets/tech-meeting-flatlay.jpg"
    },

  ]
  transform: string;

  itemToDisplay = 0;

  constructor() { }

  ngOnInit(): void {
  }
  next() {
    this.transform = 'next'

    if (this.itemToDisplay < this.items.length - 1) {
      this.itemToDisplay++
    } else if (this.itemToDisplay == this.items.length - 1) {
      this.itemToDisplay = 0
    }
  }
  previes() {
    this.transform = 'previes'
    if (this.itemToDisplay > 0) {
      this.itemToDisplay--;

    } else {
      this.itemToDisplay = this.items.length - 1
    }
  }
}
