import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from './products-repository.service';
import { FilterProducts } from './filter-products.service';
import { Observable, Subscriber } from 'rxjs';
import { IProduct } from './products';
import { MarcaRepositoryService } from '../marcas/marcas-repository.service';
import { IMarca } from '../marcas/marcas';
import { CategoriaRepositoryService } from '../categorias/categorias-repository.service';
import { ICategoria } from '../categorias/categorias';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    filterproducts: any[];
    filterproductsmarca: any[];
    filterproductscateg: any[];
    selectMarca: string = '';
    selectCateg: string = '';
    selectAll: string = '';
    titleShow: string = 'Todos los Productos';
    errorMessage: string;
    allNoneMarca = false;
    allNoneCateg = false;

    filteredProducts: any[];
    products: IProduct[] = [];
    marcas: IMarca[] = [];
    categorias: ICategoria[] = [];

    _listFilter: string;

    p: number = 1;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this.allNoneCateg = true;
        this.allNoneMarca = true;
        this._listFilter = value;
        if (!this.listFilter) {
            this.titleShow = 'Todos los Productos';
        } else {
            this.titleShow = this.listFilter;
        }
        this.filterproducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filteredBy): IProduct[] {
        filteredBy = filteredBy.toLocaleLowerCase();
        const typeInput = isNaN(filteredBy);
        if (typeInput === true) {
            const byName = this.products.filter((product: IProduct) =>
            product.name.toLocaleLowerCase().indexOf(filteredBy) !== -1);
            return byName;
        } else {
            const byId = this.products.filter((product: IProduct) =>
            product.numParte.toLocaleString().indexOf(filteredBy) !== -1);
            return byId;
        }
    }

    onSelectM(marca) {
        // this.listFilter = '';
        this.allNoneMarca = false;
        this.allNoneCateg = true;
        this.selectMarca = marca;
        if (this.selectMarca === 'ALL') {
            this.titleShow = 'Todos los Productos';
        } else {
            this.titleShow = this.selectMarca;
        }
        if (this.selectMarca) {
            this.selectCateg = '';
            this.selectAll = '';
        }
    }
    onSelectC(categoria) {
        // this.listFilter = '';
        this.allNoneCateg = false;
        this.allNoneMarca = true;
        this.selectCateg = categoria;
        if (this.selectCateg === 'ALL') {
            this.titleShow = 'Todos los Productos';
        } else {
            this.titleShow = this.selectCateg;
        }
        if (this.selectCateg) {
            this.selectMarca = '';
            this.selectAll = '';
        }
    }
    onSelectAll() {
        // this.listFilter = '';
        this.allNoneMarca = true;
        this.allNoneCateg = true;
        this.selectAll = 'Todos los Productos';
        this.titleShow = this.selectAll;
        if (this.selectAll) {
            this.selectMarca = '';
            this.selectCateg = '';
        }
    }
    clearInput() {
        this.listFilter = '';
    }



    constructor(
        private productRepository: ProductRepositoryService,
        private marcaRepository: MarcaRepositoryService,
        private categoriaRepository: CategoriaRepositoryService,
        private filterRepository: FilterProducts
    ) {}

    ngOnInit() {
        /* Get all products from service */
        this.productRepository.getProducts()
            .subscribe(products => {
                this.products = products;
                this.filteredProducts = this.products;
                this.applyFilter('');
            },
                error => this.errorMessage = <any>error);

        this.marcaRepository.getMarcas()
            .subscribe(marcas => {
                this.marcas = marcas;
            },
                error => this.errorMessage = <any>error);

        this.categoriaRepository.getCategorias()
            .subscribe(categorias => {
                this.categorias = categorias;
            },
                error => this.errorMessage = <any>error);


    }

    applyFilter(filter) {
        this.filterproducts = this.filterRepository.filterProductsMarca(filter, this.products);
    }

}
