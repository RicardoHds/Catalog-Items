import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { IAncho } from './ancho';


@Injectable()
export class AnchoRepositoryService {
    private _anchoUrl = './api/products/ancho.json';

    constructor(private _http: HttpClient) { }

    getAncho(): Observable<IAncho[]> {
        return this._http.get<IAncho[]>(this._anchoUrl).pipe(
        // tap(data => console.log('All Marcas: ' + JSON.stringify(data))),
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
