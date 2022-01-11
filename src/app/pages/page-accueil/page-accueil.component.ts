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
  public listDataGlobal: any[];
  public listDataFilter: any[];
  public listCategoriesFilter: string[];

  public indexFilter: number;

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listDataGlobal = [];
    this.listDataFilter = [];
    this.listCategoriesFilter = [];
    this.indexFilter = 0;
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
        this.listDataGlobal = [...listPlant];
        this.listDataFilter = [...this.listDataGlobal];
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
        console.log(this.listData);
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }

  onRatingFilter(stateNumber: number): void {
    let listRate: any[] = [];
    if(this.indexFilter == 0) {
      this.indexFilter++;
      this.listDataGlobal.forEach(product => {
        if(product.product_rating >= stateNumber) {
          listRate.push(product);
        }
      });
    } else {
      this.listData.forEach(product => {
        if(product.product_rating >= stateNumber) {
          listRate.push(product);
        }
      });
    }
    
    this.onApplyFilters(listRate);
  }

  onPriceFilter(rangeNumber: number[]) {
    console.log(rangeNumber);
    let listRangedProduct: any[] = [];
    if(this.indexFilter == 0) {
      this.indexFilter++;
      this.listDataGlobal.forEach(product => {
        if(parseFloat(product.product_unitprice_ati) >= rangeNumber[0] && parseFloat(product.product_unitprice_ati) <= rangeNumber[1]) {
          listRangedProduct.push(product);
        }
      });
    } else {
      this.listData.forEach(product => {
        if(parseFloat(product.product_unitprice_ati) >= rangeNumber[0] && parseFloat(product.product_unitprice_ati) <= rangeNumber[1]) {
          listRangedProduct.push(product);
        }
      });
    }
    
    this.onApplyFilters(listRangedProduct);
  }

  onApplyFilters(DataFilter: any[]): void {
    /*if(this.indexFilter == 0) {
      this.listData = [...DataFilter];
      this.indexFilter++;
    } else {
      this.listDataFilter = [...this.listData];
    }*/

    this.listData = [...DataFilter];
    
    //if(this.listData.length >= 9) this.listData.length = 9;
  }

}
