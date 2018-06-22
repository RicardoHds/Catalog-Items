import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ICombustible } from './combustible';


@Injectable()
export class CombustibleRepositoryService {
    private _combustibleUrl = './api/products/combustible.json';

    constructor(private _http: HttpClient) { }

    getCombustible(): Observable<ICombustible[]> {
        return this._http.get<ICombustible[]>(this._combustibleUrl).pipe(
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
