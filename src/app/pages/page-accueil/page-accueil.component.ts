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
  public listDataGlobal : any[];
  public listCategoriesFilter: string[];
  public dataFilterCategory : any;
  

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listDataGlobal=[];
    this.listCategoriesFilter = [];
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
        this.listDataGlobal=[...listPlant];
        console.log(this.listDataGlobal);
        /**
         * Technique avec Underscore JS pour recupérer les catégories uniques de nos plantes
         */
        const listAllCategories = listPlant.map(product => product.product_breadcrumb_label);
        console.log(listAllCategories);
        
        const listUniqCategories = _.uniq(listAllCategories) 
        console.log(listUniqCategories);
        

        /**
         * Technique native JS pour recupérer les catégories uniques de nos plantes
         */

        const listUniqJsCategories = [...new Set(listAllCategories)];
        console.log(listUniqJsCategories);

        this.listCategoriesFilter = listUniqJsCategories;
        this.listData = listPlant;
        this.listData.length = 9;


      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }

  onListCategory(categoryArray: string[]) {
   // this.listData=listData;
    //console.log(typeof(valueText));

    if(categoryArray.length == 0) {
      this.listData = [...this.listDataGlobal];

    } else if(categoryArray.length > 0) {
      let listProductsByCategory:string[] = [];
      this.listDataGlobal.forEach(product => {

        categoryArray.forEach(categorySelected => {
          if (product.product_breadcrumb_label == categorySelected){
            listProductsByCategory.push(product);
          }
        });
      });
    this.listData= [...listProductsByCategory];
    }

  if(this.listData.length>=9){
    this.listData.length=9;
  }
}


}
