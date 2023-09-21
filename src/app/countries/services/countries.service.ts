import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public apiUrl: string = 'https://restcountries.com/v3.1'

  constructor( private _http: HttpClient ) { }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url: string = `${ this.apiUrl }/alpha/${ code }`;
    return this._http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError(() => of(null))
      )
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ term }`;
    return this._http.get<Country[]>( url )
      .pipe( catchError(() => of([]))); 
  }

  searchByCountry( term: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ term }`;
    return this._http.get<Country[]>( url )
      .pipe( catchError(() => of([])));
  }

  searchByRegion( region: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ region }`;
    return this._http.get<Country[]>( url )
      .pipe( catchError(() => of([])));
  } 
}



