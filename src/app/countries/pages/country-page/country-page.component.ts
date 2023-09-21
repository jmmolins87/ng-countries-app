import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { DomSanitizer } from '@angular/platform-browser';

interface Codes {
  language: string;
  code: string;
}

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public urlMap: any = this.country?.maps.googleMaps;
  public country?: Country;
  public codes: Codes[] = [
    {
      language: 'Bretón',
      code: 'bre'
    },
    {
      language: 'Arabe',
      code: 'ara'
    },
    {
      language: 'Checo',
      code: 'ces'
    },
    {
      language: 'Galés',
      code: 'cym'
    },
    {
      language: 'Alemán',
      code: 'deu'
    },
    {
      language: 'Estonio',
      code: 'est'
    },
    {
      language: 'Finlandés',
      code: 'fin'
    },
    {
      language: 'Francés',
      code: 'fra'
    },
    {
      language: 'Croata',
      code: 'fra'
    },
    {
      language: 'Húngaro',
      code: 'hun'
    },
    {
      language: 'Italiano',
      code: 'ita'
    },
    {
      language: 'Japonés',
      code: 'jpn'
    },
    {
      language: 'Coreano',
      code: 'kor'
    },
    {
      language: 'Flamenco',
      code: 'nld'
    },
    {
      language: 'Persa',
      code: 'per'
    },
    {
      language: 'Polaco',
      code: 'pol'
    },
    {
      language: 'Portugués',
      code: 'por'
    },
    {
      language: 'Ruso',
      code: 'rus'
    },
    {
      language: 'Eslovaco',
      code: 'slk'
    },
    {
      language: 'Español',
      code: 'spa'
    },
    {
      language: 'Serbio',
      code: 'srp'
    },
    {
      language: 'Sueco',
      code: 'swe'
    },
    {
      language: 'Turco',
      code: 'tur'
    },
    {
      language: 'Urdu',
      code: 'tur'
    },
    {
      language: 'Chino',
      code: 'zho'
    },
  ];
  
  constructor( 
    private _activatedRoute: ActivatedRoute, 
    private _countriesService: CountriesService,
    private _router: Router,
    private _domSanitizer: DomSanitizer 
  ) { 
    this.urlMap = this._domSanitizer.bypassSecurityTrustResourceUrl( this.urlMap );
  }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._countriesService.searchCountryByAlphaCode( id ))
      )
      .subscribe( country => {
        if( !country ) return this._router.navigateByUrl(''); 
        return this.country = country;
      });
  }

  searchCountry( code: string ) {
    this._countriesService.searchCountryByAlphaCode( code )
      .subscribe( country => {
        console.log( country );
      })
  }
}
