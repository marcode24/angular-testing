import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { PicoComponent } from './components/pico/pico.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'pico', component: PicoComponent },
  { path: 'person', component: PersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
