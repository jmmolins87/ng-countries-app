import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public apiUrl: string = 'https://restcountries.com/v3.1';

  // 1. Load the cacheStore from localStorage
  public cacheStore: CacheStore = {
    // 2. If not exists, initialize it
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  // 3. Load the cacheStore from localStorage
  constructor( private _http: HttpClient ) { 
    // 4. Load the cacheStore from localStorage
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    // 1. Save the cacheStore to localStorage
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    // 1. Check if the cacheStore exists in localStorage
    if( !localStorage.getItem( 'cacheStore' )) return;

    // 2. If exists, load it into the service's cacheStore
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  } 

  private getCountriesRquest( url: string ): Observable<Country[]> {
    // 1. Check if the request has been made before
    return this._http.get<Country[]>( url )
      .pipe( 
        catchError(() => of([]))
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    // 1. Check if the request has been made before
    const url: string = `${ this.apiUrl }/alpha/${ code }`;
    // 2. If exists, return the cached data
    return this._http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError(() => of(null))
      )
  }

  searchByCapital( term: string ): Observable<Country[]> {
    // 1. Check if the request has been made before
    const url: string = `${ this.apiUrl }/capital/${ term }`;
    // 2. If exists, return the cached data
    return this.getCountriesRquest( url )
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchByCountry( term: string ): Observable<Country[]> {
    // 1. Check if the request has been made before
    const url: string = `${ this.apiUrl }/name/${ term }`;
    // 2. If exists, return the cached data
    return this.getCountriesRquest( url )
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term, countries }),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchByRegion( region: Region ): Observable<Country[]> {
    // 1. Check if the request has been made before
    const url: string = `${ this.apiUrl }/region/${ region }`;
    // 2. If exists, return the cached data
    return this.getCountriesRquest( url )
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage())
      );
  } 
}



