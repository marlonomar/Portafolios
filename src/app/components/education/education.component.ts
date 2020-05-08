import { Component, OnInit } from '@angular/core';
import { Education } from '../../models/education';
import { HttpClient} from  '@angular/common/http';

declare var $ : any ;

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.less']
})
export class EducationComponent implements OnInit {
  public education : Array<Education>;
  public data : any;
  public language :string;
  public seeMoreButton : string;
  public certificate : string;
  constructor(
    private http : HttpClient
  ) { 
    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";

    this.language = localStorage.getItem('language');
    
    http.get(routeJson + this.language +'.json').subscribe(resp =>{

      this.data = resp;
      this.seeMoreButton = this.data.site.components.seeMoreButton;
      this.certificate = this.data.site.components.certificate;
    });

    var route = 'https://marlonomar.github.io/portafolios/assets/documents/';
    this.education =[
      new Education('Master en JavaScript: Aprender JS, jQuery, Angular 9, NodeJS','Agosto 2019','Udemy',route+'masterJavacript.pdf','','master-javascript-udemy'),
      new Education('JQUERY Fundamentals course','Agosto 2018','SoloLearn',route+'jquery.pdf','','jquery-sololearn'),
      new Education('Javascript Fundamentals course','Agosto 2018','SoloLearn',route+'javascript.pdf','','javascript-sololearn'),
      new Education('CSS Fundamentals course','Agosto 2018','SoloLearn',route+'css.pdf','','css-sololearn'),
      new Education('HTML Fundamentals course ','Julio 2018','SoloLearn',route+'html.pdf','','html-sololearn'),
      new Education('Estudiante de PNF en informática','Venezuela 2017','UPTM Universidad Politécnica Territorial del Estado Mérida – Kléber Rámirez, Ejido Estado Mérida ','javascript::','','uptm')
    ];
  }

  seeMore(){
    var seemoreButton = $(".education .seemore-button");
    var items = $(".education-item");
    seemoreButton.click(function(){
      items.show();
      seemoreButton.remove();
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.seeMore();
  }

}
