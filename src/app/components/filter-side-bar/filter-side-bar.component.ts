import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() stateNumber = new EventEmitter();
  @Output() rangeNumber = new EventEmitter();
  filterStateNumber: number = 0;
  
  constructor() { 
    this.listCategories = [];
  }

  ngOnInit(): void {
  }

  onStateNumberChange(stateNumber: number): void {
    this.filterStateNumber = stateNumber;
  }

  onSendRating():void {
    this.stateNumber.emit(this.filterStateNumber);
  }

  onSendValues(minNum: any, maxNum: any): void {
    let rangeArray: number[] = [parseFloat(minNum.value), parseFloat(maxNum.value)];
    console.log(typeof(rangeArray[0]));
    this.rangeNumber.emit(rangeArray);
  }

}
