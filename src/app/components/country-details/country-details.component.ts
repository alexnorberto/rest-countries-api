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
  noBorders = false;

  constructor(
    private countriesService : CountriesServiceService ,
    private route : ActivatedRoute,
    private router: Router,
    public appComponent : AppComponent
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,100);
    //history.state get state data passed by the routerlink
    if (history.state.country){
      this.currentCountry = history.state.country;
      if (this.currentCountry) {
        let borders = this.currentCountry.borders.join(";");
        console.log("fronteiras "+ borders)
        if (borders != [])
          this.getBorders(borders);
        else this.noBorders = true;
      }
    } else { 
      this.getCurrentCountry(this.route.snapshot.paramMap.get('id'));
    }
  }

  getBorders(borders){
    this.appComponent.toggleLoading("");
    this.countriesService.getCountryByCode(borders).subscribe(
      borders => {  
        borders.forEach(border => {
          this.currentBorders.push(border.name)
        });
        this.appComponent.toggleLoading("none");
      },
      error => {
        console.log("Erro borders ")
        console.log(error)
        this.appComponent.toggleLoading("none");
      }
    );
  }

  getCurrentCountry(id):void{
    this.appComponent.toggleLoading("");
    this.countriesService.getCountry(id).subscribe(
        country => {
          this.currentCountry = country[0];
          this.countryName = country[0].name;
          let borders = country[0].borders.join(";");
          if (borders != [])
            this.countriesService.getCountryByCode(borders).subscribe(
              borders => {  
                borders.forEach(border => {
                  this.currentBorders.push(border.name)
                });
                this.appComponent.toggleLoading("none");
              },
              error => {
                console.log("Erro borders ")
                console.log(error)
                this.appComponent.toggleLoading("none");
              }
            ); 
            else {
              this.noBorders = true;
              this.appComponent.toggleLoading("none");
            }          
        },
        error => {
          console.log("Erro details ")
          console.log(error)
          this.appComponent.toggleLoading("none");
        }
      );
  }

  goToCountryPage(name):void{
    console.log("clicou pra irrr"+name)
    this.router.navigate(['countries/'+name], { state: { country:this.currentCountry } });
    this.countryName = name;
    this.currentBorders = [];
    window.scrollTo(0,100);
    this.getCurrentCountry(name);
  }

}
