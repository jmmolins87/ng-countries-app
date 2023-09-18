import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public customTitle: string = 'Capital';
  public countries: Country[] = [];

  constructor( private _countriesService: CountriesService ) { }

  searchByCapital( term: string ) {

    this._countriesService.searchByCapital( term )
      .subscribe( data => {
        this.countries = data;
        console.log( this.countries );
      })
  }

}
