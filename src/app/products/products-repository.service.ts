import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { IProduct } from './products';


@Injectable()
export class ProductRepositoryService {
    private _productUrl = './api/products/products.json';

    constructor(private _http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productUrl).pipe(
        // tap(data => console.log('Products: ' + JSON.stringify(data))),
        tap(),
        catchError(this.handleError), );
    }

    getProduct(id: string): Observable<IProduct> {
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.MODELO === id)));
    }

    private handleError(err) {
        let errorMessage = '';
        if (err.error instanceof Error) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
    }

/*
    Code before apply service
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
        console.log(subject);
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
    */
