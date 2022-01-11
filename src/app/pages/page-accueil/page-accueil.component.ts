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

  public rangeNumber: number[];
  public stateNumber: number;

  public isPricingFilterActive: boolean;
  public isRatingFilterActive: boolean;

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listDataGlobal = [];
    this.listDataFilter = [];
    this.listCategoriesFilter = [];

    this.rangeNumber = [];
    this.stateNumber = 0;

    this.isPricingFilterActive = false;
    this.isRatingFilterActive = false;
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

        console.log(this.listData);
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }

  onRatingFilter(stateNumber: number): void {
    this.stateNumber = stateNumber;
    this.isRatingFilterActive = true;
    
    this.onApplyFilters();
  }

  onPriceFilter(rangeNumber: number[]) {
    this.rangeNumber = [...rangeNumber];
    this.isPricingFilterActive = true;
    
    this.onApplyFilters();
  }

  onApplyFilters(): void {

    if(this.isPricingFilterActive) {
      let listDataFinal: any = [];
      this.listDataGlobal.forEach(product => {
        if(parseFloat(product.product_unitprice_ati) >= this.rangeNumber[0] && parseFloat(product.product_unitprice_ati) <= this.rangeNumber[1]) {
          listDataFinal.push(product);
        }
      });
      this.listData = [...listDataFinal];
    }

    if(this.isRatingFilterActive) {
      let listDataFinal: any = [];
      this.listDataGlobal.forEach(product => {
        if(product.product_rating >= this.stateNumber) {
          listDataFinal.push(product);
        }
      });
      this.listData = [...listDataFinal];
    }

    if(this.isPricingFilterActive && this.isRatingFilterActive) {
      let listDataFinal: any = [];
      this.listDataGlobal.forEach(product => {
        if(parseFloat(product.product_unitprice_ati) >= this.rangeNumber[0] 
        && parseFloat(product.product_unitprice_ati) <= this.rangeNumber[1]
        && product.product_rating >= this.stateNumber) {
          listDataFinal.push(product);
        }
      });
      this.listData = [...listDataFinal];
      console.log(this.listData);
    }
    
    if(this.listData.length >= 9) this.listData.length = 9;
  }
}
