import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor( private _http: HttpClient ) { }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  } 

  private getCountriesRquest( url: string ): Observable<Country[]> {
    return this._http.get<Country[]>( url )
      .pipe( 
        catchError(() => of([]))
      );
  }

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
    return this.getCountriesRquest( url );
  }

  searchByCountry( term: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRquest( url );
  }

  searchByRegion( region: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRquest( url );
  } 
}



