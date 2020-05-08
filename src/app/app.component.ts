import { Component } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

var $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'portafolios';

  public year: string;
  public name: string;
  public footerComplement : string;

  //category title

  public briefcaseTitle : string;
  public briefcaseSubTitle : string;
  public abilityTitle : string;
  public abilitySubTitle : string;
  public experienceTitle : string;
  public experienceSubTitle : string;
  public educationTitle : string;
  public educationSubTitle : string;
  public informationTitle : string;
  public informationSubTitle : string;

  public language :string;

  public data : any;
  
  constructor(
    private http : HttpClient
  ){
   
  }

  ngOnInit() {

    if(!localStorage.getItem('language')){
      localStorage.setItem('language', window.navigator.language);
      window.location.reload();
    }
    
    

    this.language = localStorage.getItem('language');
    
    var thisYear = new Date().getFullYear();  
    this.year = thisYear.toString();

    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";
   
    this.http.get(routeJson + this.language +'.json').subscribe(resp =>{

      this.data = resp;

      this.name =  this.data.user.name;
      this.footerComplement = this.data.site.components.footerComplement;
    });


  }

 



  ngAfterViewInit(){
  }

}
