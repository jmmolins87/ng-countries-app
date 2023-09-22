import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor( private _countriesService: CountriesService ) { }

  searchByCountry( term: string ) {

    this.isLoading = true;
    this._countriesService.searchByCountry( term )
      .subscribe( data => {
        this.countries = data;
        this.isLoading = false;
      })
  }

}
