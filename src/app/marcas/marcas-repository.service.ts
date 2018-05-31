import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { IMarca } from './marcas';


@Injectable()
export class MarcaRepositoryService {
    private _marcaUrl = './api/products/marcas.json';

    constructor(private _http: HttpClient) { }

    getMarcas(): Observable<IMarca[]> {
        return this._http.get<IMarca[]>(this._marcaUrl).pipe(
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
