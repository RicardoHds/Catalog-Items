import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from './products-repository.service';
import { FilterProducts } from './filter-products.service';
import { NgForm } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { IProduct } from './products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: any[];
    marcas: any[];
    categorias: any[];
    filterproducts: any[];
    filterproductsmarca: any[];
    filterproductscateg: any[];
    marca: string = '';
    selectMarca: string = '';
    categoria: string = '';
    selectCateg: string = '';
    selectAll: string = '';
    titleShow: string = 'Todo';

    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        if (!this.listFilter) {
            this.titleShow = 'Todo';
        } else {
            this.titleShow = this.listFilter;
        }
        this.filterproducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filteredBy): IProduct[] {
        filteredBy = filteredBy.toLocaleLowerCase();
        const fil = this.products.filter((product = this.products) =>
        product.productId.toLocaleLowerCase().indexOf(filteredBy) !== -1);
        const ful = this.products.filter((product = this.products) =>
        product.name.toLocaleLowerCase().indexOf(filteredBy) !== -1);
        return fil;
    }

    onSelectM(marca) {
        this.selectMarca = marca;
        this.titleShow = this.selectMarca;
        if (this.selectMarca) {
            this.selectCateg = '';
            this.selectAll = '';
        }
    }
    onSelectC(categoria) {
        this.selectCateg = categoria;
        this.titleShow = this.selectCateg;
        if (this.selectCateg) {
            this.selectMarca = '';
            this.selectAll = '';
        }
    }
    onSelectAll() {
        this.selectAll = 'Todo';
        this.titleShow = this.selectAll;
        if (this.selectAll) {
            this.selectMarca = '';
            this.selectCateg = '';
        }
    }


    constructor(
        private productRepository: ProductRepositoryService,
        private filterRepository: FilterProducts
    ) {}

  ngOnInit() {
    this.productRepository.getProduct()
    .subscribe(products => {
        this.products = products;
        this.applyFilter('');
    });

    this.productRepository.getMarcas()
        .subscribe(marcas => {
            this.marcas = marcas;
    });

    this.productRepository.getCategorias()
        .subscribe(categorias => {
            this.categorias = categorias;
    });
  }

    applyFilter(filter) {
        this.filterproducts = this.filterRepository.filterProductsMarca(filter, this.products);
        /*if (!this.filterproductscateg) {
            this.filterproducts = this.filterRepository.filterProductsMarca(filter, this.products);
            this.filterproductsmarca = this.filterRepository.filterProductsMarca(filter, this.products);
        }
        if (this.filterproductscateg) {
            this.filterproducts = this.filterRepository.filterProductsMarca(filter, this.filterproductscateg);
            this.filterproductsmarca = this.filterRepository.filterProductsMarca(filter, this.filterproductscateg);
        }*/
    }

    /* applyFilterCat(filter) {
        if (this.filterproductsmarca) {
            this.filterproducts = this.filterRepository.filterProductsCateg(filter, this.filterproductsmarca);
            this.filterproductscateg = this.filterRepository.filterProductsCateg(filter, this.filterproductsmarca);
        }
        if (!this.filterproductsmarca) {
            this.filterproducts = this.filterRepository.filterProductsCateg(filter, this.filterproductsmarca);
            this.filterproductscateg = this.filterRepository.filterProductsCateg(filter, this.products);
        }
    } */

}
