import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-avis-bar',
  templateUrl: './avis-bar.component.html',
  styleUrls: ['./avis-bar.component.scss']
})
export class AvisBarComponent implements OnInit {
  starStates: { stateSelectedUser: boolean, stateHoverUser: boolean, stateRatingProduct: boolean }[];
  @Output() stateNumber = new EventEmitter
  starStateNumber: number = 0;
  @Input() ratingIndex: number = 0;
  isOver: boolean;

  constructor() {
    this.starStates = [];
    this.isOver = false;

    for (let index = 0; index < 5; index++) {
      this.starStates.push(
        {
          stateSelectedUser: false,
          stateHoverUser: false,
          stateRatingProduct: false
        }
      );
    }
  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      if (i < this.ratingIndex) {
        this.starStates[i].stateRatingProduct = true;
      } else {
        this.starStates[i].stateRatingProduct = false;
      }
    }
  }

  onMouseOver(index: number) {
    console.log("star over", index);
    this.isOver = true;
    for (let i = 0; i < this.starStates.length; i++) {
      if (i <= index) {
        this.starStates[i].stateHoverUser = true;
      } else {
        this.starStates[i].stateHoverUser = false;
      }
    }
  }

  onMouseLeave() {
    // this.starState = ['star', 'star', 'star', 'star', 'star'];
    this.isOver = false;
    const tempTab = [];
    for (let index = 0; index < this.starStates.length; index++) {
      tempTab.push(
        {
          stateSelectedUser: this.starStates[index].stateSelectedUser,
          stateHoverUser: this.starStates[index].stateSelectedUser,
          stateRatingProduct: this.starStates[index].stateRatingProduct
        }
      );
    }
    this.starStates = [...tempTab];
  }

  onClickStar(starIndex: number) {
    this.starStateNumber = 0;
    for (let i = 0; i < this.starStates.length; i++) {
      if (i <= starIndex) {
        this.starStates[i].stateSelectedUser = true;
        this.starStates[i].stateRatingProduct = true;
        this.starStateNumber++;
      } else {
        this.starStates[i].stateSelectedUser = false;
        this.starStates[i].stateRatingProduct = false;
      }
    }
    //console.log(`Rating : ${this.starStateNumber}`);
    this.stateNumber.emit(this.starStateNumber);
  }
}
