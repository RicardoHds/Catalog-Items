import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductGuardService } from './products/product-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'productos', pathMatch: 'full'},
    { path: 'productos', component: ProductsComponent },
    { path: 'productos/:id', canActivate: [ ProductGuardService ], component: ProductDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
