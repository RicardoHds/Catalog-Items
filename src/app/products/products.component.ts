import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from './products-repository.service';
import { FilterProducts } from './filter-products.service';
import { Observable, Subscriber } from 'rxjs';
import { IProduct } from './products';
import { AnchoRepositoryService } from '../ancho/ancho-repository.service';
import { IAncho } from '../ancho/ancho';
import { CapacidadRepositoryService } from '../capacidad/capacidad-repository.service';
import { ICapacidad } from '../capacidad/capacidad';
import { CombustibleRepositoryService } from '../combustible/combustible-repository.service';
import { ICombustible } from '../combustible/combustible';
import { EstibaRepositoryService } from '../estiba/estiba-repository.service';
import { IEstiba } from '../estiba/estiba';
import { UsoRepositoryService } from '../uso/uso-repository.service';
import { IUso } from '../uso/uso';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    filterproducts: any[];
    filterproductsuso: any[];
    filterproductscapacidad: any[];
    filterproductscombustible: any[];
    selectUso: string = '';
    selectCapacidad: string = '';
    selectCombustible: string = '';
    selectAll: string = '';
    titleShow: string = 'Todos los Productos';
    errorMessage: string;
    allNoneUso = false;
    allNoneCapacidad = false;
    allNoneCombustible = false;

    filteredProducts: any[];
    products: IProduct[] = [];
    ancho: IAncho[] = [];
    capacidad: ICapacidad[] = [];
    combustible: ICombustible[] = [];
    estiba: IEstiba[] = [];
    uso: IUso[] = [];
    

    _listFilter: string;

    p: number = 1;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this.allNoneUso = true;
        this.allNoneCapacidad = true;
        this.allNoneCombustible = true;
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
            product.DESCRIPCION.toLocaleLowerCase().indexOf(filteredBy) !== -1);
            return byName;
        } else {
            const byId = this.products.filter((product: IProduct) =>
            product.MODELO.indexOf(filteredBy) !== -1);
            return byId;
        }
    }

    onSelectUso(uso) {
        // this.listFilter = '';
        this.allNoneCapacidad = false;
        this.allNoneUso = false;
        this.allNoneCombustible = false;
        this.selectUso = uso;
        if (this.selectUso === 'ALL') {
            this.titleShow = 'Todos los Productos';
        } else {
            this.titleShow = this.selectUso;
        }
        if (this.selectUso) {
            this.selectCapacidad = '';
            this.selectCombustible = '';
            this.selectAll = '';
        }
    }
    onSelectCapacidad(capacidad) {
        // this.listFilter = '';
        this.allNoneCapacidad = false;
        this.allNoneUso = false;
        this.allNoneCombustible = false;
        this.selectCapacidad = capacidad;
        if (this.selectCapacidad === 'ALL') {
            this.titleShow = 'Todos los Productos';
        } else {
            this.titleShow = this.selectCapacidad;
        }
        if (this.selectCapacidad) {
            this.selectUso = '';
            this.selectCombustible = '';
            this.selectAll = '';
        }
    }
    onSelectCombustible(combustible) {
        // this.listFilter = '';
        this.allNoneCapacidad = false;
        this.allNoneUso = false;
        this.allNoneCombustible = false;
        this.selectCombustible = combustible;
        if (this.selectCombustible === 'ALL') {
            this.titleShow = 'Todos los Productos';
        } else {
            this.titleShow = this.selectCombustible;
        }
        if (this.selectCombustible) {
            this.selectUso = '';
            this.selectCapacidad = '';
            this.selectAll = '';
        }
    }
    onSelectAll() {
        // this.listFilter = '';
        this.allNoneCapacidad = true;
        this.allNoneUso = true;
        this.allNoneCombustible = true;
        this.selectAll = 'Todos los Productos';
        this.titleShow = this.selectAll;
        if (this.selectAll) {
            this.selectUso = '';
            this.selectCapacidad = '';
            this.selectCombustible = '';
        }
    }
    clearInput() {
        this.listFilter = '';
    }



    constructor(
        private productRepository: ProductRepositoryService,
        private anchoRepository: AnchoRepositoryService,
        private capacidadRepository: CapacidadRepositoryService,
        private combustibleRepository: CombustibleRepositoryService,
        private estibaRepository: EstibaRepositoryService,
        private usoRepository: UsoRepositoryService,
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

        this.capacidadRepository.getCapacidad()
            .subscribe(capacidad => {
                this.capacidad = capacidad;
            },
                error => this.errorMessage = <any>error);

        this.combustibleRepository.getCombustible()
            .subscribe(combustible => {
                this.combustible = combustible;
            },
                error => this.errorMessage = <any>error);

        this.usoRepository.getUso()
            .subscribe(uso => {
                this.uso = uso;
            },
                error => this.errorMessage = <any>error);


    }

    applyFilter(filter) {
        this.filterproducts = this.filterRepository.filterProducts(filter, this.products);
    }

}
