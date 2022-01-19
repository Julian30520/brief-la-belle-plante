import { Component, OnInit } from '@angular/core';
import { PlantouneService } from 'src/app/services/plantoune.service';
import * as _ from 'underscore';
import { contains, includes } from 'underscore';




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
  public listDataFilter: any[];
  public listCategoriesFilter: string[];
  public dataFilterCategory : any;
  

  public rangeNumber: number[];
  public stateNumber: number;

  public isPricingFilterActive: boolean;
  public isRatingFilterActive: boolean;

  public clickCounter : any;

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listCategoriesFilter = [];
    this.listPricePlant = [];
    this.listDataGlobal = [];
    this.clickCounter = 0;
    this.listDataFilter = [];

    this.rangeNumber = [];
    this.stateNumber = 0;

    this.isPricingFilterActive = false;
    this.isRatingFilterActive = false;

    this.clickCounter = 0;
   }

   /**
    * equivalent de la ligne du dessus
    *
    * plantouneService;
    *
    * constructor(plantouneService: PlantouneService) {
    *   this.plantouneService = plantouneService; }
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
        this.listData = [...listPlant];
        this.listData.length = 9;
        this.listDataGlobal = [...listPlant]
        
        console.log(this.listData);
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('');
  }

onRecherchePlante(choix: any) {

this.clickCounter ++
console.log(this.clickCounter)
  if (this.clickCounter %2) {
    this.listData.sort((a, b) => parseFloat(a.product_price) - parseFloat(b.product_price));
    }else{
    this.listData.sort((a, b) => parseFloat(b.product_price) - parseFloat(a.product_price));
    }
    const search = choix.target.value 
    console.log(search);
    this.listData = this.listDataGlobal.filter((plant) => {
      if(plant.product_name.toLowerCase().includes(search.toLowerCase())){
        return plant;
      }
    });
    //Equivaut à la ligne ci-dessous (version abrégée)
    //this.listData = this.listDataGlobal.filter((plant) => plant.product_name.toLowerCase().includes(search.toLowerCase()))
    console.log(this.listData);
    if (this.listData.length >= 9) {this.listData.length=9}
  }

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
    this.clickCounter = 0;

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

