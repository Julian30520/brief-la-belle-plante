import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantouneService } from 'src/app/services/plantoune.service';


@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  product : any;
 public listData : any[];

    constructor(private route: ActivatedRoute, private plantouneService: PlantouneService) {

      this.listData = [];
   }

  ngOnInit(): void {

    this.plantouneService.getData().subscribe(
      (listPlant: any[]) => {
        console.log(listPlant);

        this.listData = listPlant;

    
    //ajoute le ProductId à l'url
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number (routeParams.get('productId'));

    //trouve le produit qui correspond à l'Id de la route

   this.product = this.listData.find (product => product.product_id === productIdFromRoute);

  })
}

  test(id:any){
  console.log(id);
  }
}
