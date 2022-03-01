import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlantouneService} from 'src/app/services/plantoune.service';


@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {

  detailsPlant: any;
  public listData: any[];

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
        const productIdFromRoute = Number(routeParams.get('productId'));

        // Faire appel au service et récuperer et executer la requete http  et lui fournir le productId
        this.plantouneService.getPlantById(productIdFromRoute).subscribe
        (plant => {
          this.detailsPlant = plant[0];
          console.log(this.detailsPlant);
        })


      })
  }

  test(id: any) {
    console.log(id);
  }
}
