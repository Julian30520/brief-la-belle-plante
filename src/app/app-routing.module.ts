import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPlanteComponent } from './components/card-plante/card-plante.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PageAccueilComponent },
  { path: 'details/:productId', component: CardPlanteComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
