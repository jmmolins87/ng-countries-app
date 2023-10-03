import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = [ 'Africa', 'Europe', 'Americas', 'Asia', 'Oceania' ];
  public selectedRigon?: Region;

  constructor( private _countriesService: CountriesService ) { }

  searchByRegion( region: Region ): void {

    this.selectedRigon = region;
    this.isLoading = true;
    this._countriesService.searchByRegion( region )
      .subscribe( data => {
        this.countries = data;
        this.isLoading = false;
      })
  }

}
