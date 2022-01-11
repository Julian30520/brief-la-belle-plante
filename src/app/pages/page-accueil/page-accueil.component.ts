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
  public listDataGlobal : any[];
  public listCategoriesFilter: string[];

  constructor(private plantouneService: PlantouneService) {
    this.listData = [];
    this.listDataGlobal! = [];
    this.listCategoriesFilter = [];
   }

   /**
    * equivalent de la ligne du dessus 
    * plantouneService;
    * constructor(plantouneService: PlantouneService) {
    *   this.plantouneService = plantouneService; }
    */


  ngOnInit(): void {

    this.plantouneService.getData().subscribe(
      (listPlant: any[]) => {
      console.log("Liste Plant : ", listPlant);
    
      this.listDataGlobal = [... listPlant];

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
        this.listData = [...listPlant];
        this.listData.length = 9;
     
      }
    )
  }

  onEventLike() {
    this.plantouneService.plantLiked$.next('')
  }


onRecherchePlante(choix: any) {

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