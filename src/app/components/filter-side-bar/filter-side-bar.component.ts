import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
  @Input() listCategories: string[];
  @Output() stateNumber = new EventEmitter();
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

}
