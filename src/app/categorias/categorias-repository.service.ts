import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ICategoria } from './categorias';


@Injectable()
export class CategoriaRepositoryService {
    private _categoriaUrl = './api/products/categorias.json';

    constructor(private _http: HttpClient) { }

    getCategorias(): Observable<ICategoria[]> {
        return this._http.get<ICategoria[]>(this._categoriaUrl).pipe(
        // tap(data => console.log('All Categorias: ' + JSON.stringify(data))),
        tap(),
        catchError(this.handleError), );
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
