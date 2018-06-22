import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { IUso } from './uso';


@Injectable()
export class UsoRepositoryService {
    private _usoUrl = './api/products/uso.json';

    constructor(private _http: HttpClient) { }

    getUso(): Observable<IUso[]> {
        return this._http.get<IUso[]>(this._usoUrl).pipe(
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
