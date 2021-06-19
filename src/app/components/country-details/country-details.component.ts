import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CountriesServiceService } from 'src/app/services/countries-service.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  countryName = "";
  currentCountry: any;
  currentBorders = [];

  constructor(
    private countriesService : CountriesServiceService ,
    private route : ActivatedRoute,
    private router: Router,
    public appComponent : AppComponent
  ) { }

  ngOnInit(): void {
    this.getCurrentCountry(this.route.snapshot.paramMap.get('id'));    
  }

  getCurrentCountry(id):void{
    this.appComponent.toggleLoading("");
    this.countriesService.getCountry(id).subscribe(
        country => {
          this.currentCountry = country[0];
          this.countryName = country[0].name;
          let borders = country[0].borders.join(";");
          this.countriesService.getCountryByCode(borders).subscribe(
            borders => {              
              borders.forEach(border => {
                this.currentBorders.push(border.name)
              });
              this.appComponent.toggleLoading("none");
            },
            error => {
              console.log(error)
            }
          ); 

        },
        error => {
          console.log(error)
        }
      );
  }

  goToCountryPage(name):void{
    console.log("clicou pra irrr"+name)
    this.router.navigate(['countries/'+name]);
    this.countryName = name;
    this.getCurrentCountry(name);
  }

}
