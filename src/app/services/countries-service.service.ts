import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {

  countriesURL = "https://restcountries.eu/rest/v2/"

  constructor(
    private httpClient : HttpClient
  ) { }

  getAll(): Observable<any>{
    return this.httpClient.get<any>(this.countriesURL+"all");
  }

  getRegion(region): Observable<any>{
    return this.httpClient.get<any>(this.countriesURL+"region/"+region);
  }

  getCountry(name): Observable<any>{
    return this.httpClient.get<any>(this.countriesURL+"name/"+name+"?fullText=true");
  }

  getCountryByCode(code): Observable<any>{
    return this.httpClient.get<any>(this.countriesURL+"alpha/?codes="+code)
  }
}
