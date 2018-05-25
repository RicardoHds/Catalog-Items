
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';

// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './products';

import { catchError, mapTo } from 'rxjs/operators';




@Injectable()

export class ProductRepositoryService {
    private _productUrl = './products.json';

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }

    constructor(private _http: HttpClient) {}

    getProduct(): Observable<any[]> {
        const subject = new Subject<any>();
        const productStatus =
            productos.map(productClass => {
                return Object.assign(productClass);
            });
        setTimeout(() => {
            subject.next(productStatus);
            subject.complete();
        }, 200);
        return subject;
    }


    getMarcas(): Observable<any[]> {
        const subject = new Subject<any>();
        const marcaStatus =
            marcas.map(marcaClass => {
                return Object.assign(marcaClass);
            });
        setTimeout(() => {
            subject.next(marcaStatus);
            subject.complete();
        }, 200);
        return subject;
    }

    getCategorias(): Observable<any[]> {
        const subject = new Subject<any>();
        const categoriaStatus =
            categorias.map(categoriaClass => {
                return Object.assign(categoriaClass);
            });
        setTimeout(() => {
            subject.next(categoriaStatus);
            subject.complete();
        }, 200);
        return subject;
    }
}

const productos = [
    {
        productId: '001',
        name: 'Llanta 1',
        brand: 'Marca 1',
        description: 'Best Product',
        price: '44.99',
        image: '../assets/images/products/llantas.jpeg',
        category: 'Nuevos'
    },
    {
        productId: '002',
        name: 'Llanta 2',
        brand: 'Marca 2',
        description: 'Best Product',
        image: '../assets/images/products/llantas.jpeg',
        price: '44.99',
        category: 'Nuevos'
    },
    {
        productId: '003',
        name: 'Llanta 4',
        brand: 'Marca 3',
        description: 'Best Product',
        image: '../assets/images/products/llantas.jpeg',
        price: '44.99',
        category: 'Otros'
    },
    {
        productId: '104',
        name: 'Llanta 5',
        brand: 'Marca 3',
        description: 'Best Product',
        image: '../assets/images/products/llantas.jpeg',
        price: '44.99',
        category: 'Otros'
    }
];

const marcas = [
    {
        brandId: '001',
        name: 'Marca 1'
    },
    {
        brandId: '002',
        name: 'Marca 2'
    },
    {
        brandId: '003',
        name: 'Marca 3'
    }
];

const categorias = [
    {
        categoryId: '001',
        name: 'Nuevos'
    },
    {
        categoryId: '002',
        name: 'Usados'
    }
];
