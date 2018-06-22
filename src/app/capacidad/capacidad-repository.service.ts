import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ICapacidad } from './capacidad';


@Injectable()
export class CapacidadRepositoryService {
    private _capacidadUrl = './api/products/capacidad.json';

    constructor(private _http: HttpClient) { }

    getCapacidad(): Observable<ICapacidad[]> {
        return this._http.get<ICapacidad[]>(this._capacidadUrl).pipe(
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
