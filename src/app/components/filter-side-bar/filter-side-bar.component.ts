import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  @Output() reset = new EventEmitter();
  filterStateNumber: number = 0;
  public selectedCategory: string[];
  public rangeArray: number[];
  public minPrice : any;
  public maxPrice : any;

  constructor() {
    this.listCategories = [];
    this.selectedCategory = [];
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.rangeArray = [];
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
    if (minNum.value == "") {
      if (maxNum.value == "") {
        this.rangeArray = [parseFloat(this.minPrice), parseFloat(this.maxPrice)];
        this.rangeNumber.emit(this.rangeArray);
      } else {
        this.rangeArray = [parseFloat(this.minPrice), parseFloat(maxNum.value)];
        this.rangeNumber.emit(this.rangeArray)
      }
    } else {
      if (maxNum.value == "") {
        this.rangeArray = [parseFloat(minNum.value), parseFloat(this.maxPrice)];
        this.rangeNumber.emit(this.rangeArray);
      } else {
        this.rangeArray = [parseFloat(minNum.value), parseFloat(maxNum.value)];
        this.rangeNumber.emit(this.rangeArray);
      }
    }
  }

  onReset(): void {
    this.reset.emit();
  }
}
