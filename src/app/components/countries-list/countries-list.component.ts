import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CountriesServiceService } from 'src/app/services/countries-service.service';

interface Region {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {

  countriesList: any;
  countriesListForSearch: any;
  searchValue: "";
  currentCountryIndex: -1;
  currentCountryName: null;

  regions: Region[] = [ //Africa, Americas, Asia, , Oceania
    {value: 'Africa', viewValue: 'Africa'},
    {value: 'Americas', viewValue: 'Americas'},
    {value: 'Asia', viewValue: 'Asia'},
    {value: 'Europe', viewValue: 'Europe'},
    {value: 'Oceania', viewValue: 'Oceania'}
  ];

  constructor(
    private countriesService : CountriesServiceService,
    public appComponent : AppComponent
  ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries():void{
    this.appComponent.toggleLoading("");
    this.countriesService.getAll()
      .subscribe(
        response => {
          this.countriesList = response;
          this.countriesListForSearch = response;
          this.appComponent.toggleLoading("none");
        },
        error => {
          console.log(error)
        }
      );
  }

  getFromRegion(region):void{
    this.appComponent.toggleLoading("");
    console.log("selecioionou"+region)
    this.countriesService.getRegion(region)
    .subscribe(
      response => {
        console.log(response)
        this.countriesList = response;
        this.countriesListForSearch = response;
        console.log(this.countriesList);
        window.scrollTo(0, 0);
        this.appComponent.toggleLoading("none");
      },
      error => {
        console.log(error)
      }
    );
  }

  searchCountry():void{
    let searchValue = this.searchValue.toString().toUpperCase();
    let newList = []
    this.countriesListForSearch.forEach(country => { 
      if (country.name.toString().toUpperCase().includes(searchValue)){
        newList.push(country);
      }
    });
    this.countriesList = newList;
  }
  
  setCurrentCountry(country,id):void{
    this.currentCountryIndex = id;
    this.currentCountryName = country;  
    console.log("atual " +  this.currentCountryName);
  }

}
