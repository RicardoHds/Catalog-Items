import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductRepositoryService } from './products/products-repository.service';
import { MarcaRepositoryService } from './marcas/marcas-repository.service';
import { CategoriaRepositoryService } from './categorias/categorias-repository.service';
import { FilterProducts } from './products/filter-products.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductGuardService } from './products/product-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    ],
  providers: [
    ProductRepositoryService,
    MarcaRepositoryService,
    CategoriaRepositoryService,
    FilterProducts,
    ProductGuardService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
