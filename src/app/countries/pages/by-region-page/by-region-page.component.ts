import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = [ 'Africa', 'Europe', 'Americas', 'Asia', 'Oceania' ];
  public selectedRegion?: Region;

  constructor( private _countriesService: CountriesService ) { }

  ngOnInit(): void {
    // 1. Load the cacheStore from localStorage
    this.countries = this._countriesService.cacheStore.byRegion.countries;
    // 2. Load the selectedRegion from localStorage
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region || undefined;
  }


  searchByRegion( region: Region ): void {
  
    this.selectedRegion = region;
    this.isLoading = true;
    this._countriesService.searchByRegion( region )
      .subscribe( data => {
        this.countries = data;
        this.isLoading = false;
      })
  }

}
