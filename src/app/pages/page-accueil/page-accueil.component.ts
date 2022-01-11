import { Component, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import * as _ from 'underscore';




@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  public listData: any[];
  public listPricePlant : any[];
  public clickCounter : any;
  public listDataGlobal : any[];

  public listCategoriesFilter: string[];

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listCategoriesFilter = [];
    this.listPricePlant = [];
    this.listDataGlobal = [];
    this.clickCounter = 0;

   }

   /**
    * equivalent de la ligne du dessus
    *
    * plantouneService;
    *
    * constructor(plantouneService: PlantouneService) {
    *   this.plantouneService = plantouneService;
    * }
    */

  ngOnInit(): void {

    this.plantouneService.getData().subscribe(
      (listPlant: any[]) => {
        console.log(listPlant);

        /**
         * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
         */
        const listAllCategories = listPlant.map(product => product.product_breadcrumb_label);
        // console.log(listAllCategories);

        const listUniqCategories = _.uniq(listAllCategories)
        // console.log(listUniqCategories);



        /**
         * Technique native JS pour recupérer les catégories uniques de nos plantes
         */

        const listUniqJsCategories = [...new Set(listAllCategories)];
        console.log(listUniqJsCategories);

        this.listCategoriesFilter = listUniqJsCategories;
        this.listData = listPlant;
        this.listData.length = 9;
        // console.log(this.listData);

        this.listDataGlobal = [...listPlant]
        console.log("coucou" + this.listDataGlobal);
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('');
  }

  //Tri des prix des plantes par ordre croissant ou décroissant
onPriceTri() : void {

this.clickCounter ++
console.log(this.clickCounter)
  if (this.clickCounter %2) {
    this.listData.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
    }else{
    this.listData.sort((a, b) => parseFloat(b.product_price) - parseFloat(a.product_price));
    }
  }

  //Tri des noms des plantes par ordre alphanumérique
onAlphaTri() : void {

  this.clickCounter ++
  if (this.clickCounter %2) {
    this.listData.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
    }else{
    this.listData.sort((a, b) => (b.product_name > a.product_name) ? 1 : -1)
  }
}

//Tri des avis des plantes par ordre croissant ou décroissant
onRatingTri() : void{
  this.clickCounter ++
  if (this.clickCounter %2) {
    this.listData.sort((a, b) => (a.product_rating > b.product_rating) ? 1 : -1)
    }else{
    this.listData.sort((a, b) => (b.product_rating > a.product_rating) ? 1 : -1)
    }
  }
}
