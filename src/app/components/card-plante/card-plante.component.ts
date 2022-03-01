import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-card-plante',
  templateUrl: './card-plante.component.html',
  styleUrls: ['./card-plante.component.scss']
})
export class CardPlanteComponent implements OnInit {
  @Input() plant: any;
  @Output() clickLike = new EventEmitter();
  @Output() clickCardId = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onClickLike() {
    console.log('click');
    this.clickLike.emit();
  }

  onGetId(id: string) {
    this.clickCardId.emit(id);
    this.router.navigateByUrl('/details/' + id);
  }
}


//http://localhost:3000/list_products?product_id=952438
