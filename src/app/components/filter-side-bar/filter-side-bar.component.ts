import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() checkCategory = new EventEmitter();
  @Output() stateNumber = new EventEmitter();
  @Output() rangeNumber = new EventEmitter();
  filterStateNumber: number = 0;
  public selectedCategory: string[];


  constructor() {
    this.listCategories = [];
    this.selectedCategory = [];
  }

  ngOnInit(): void {
  }

  onCheckCategory(category: string, event: any) {
    console.log(event)


    if (event.target.checked == true) {
      //console.log("true")
      this.selectedCategory.push(category);


    }
    if (event.target.checked == false) {
      //console.log("false")
      this.selectedCategory = this.selectedCategory.filter(product => product !== category);
    }

    this.checkCategory.emit(this.selectedCategory);
    //console.log("romain" , this.selectedCategory)
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
