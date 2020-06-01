import { Component, OnInit } from '@angular/core';
import { HttpClient} from  '@angular/common/http';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.less']
})
export class IntroComponent implements OnInit {

  // personal
  public title : string;
  public name : string;
  public linkedin : string;
  public github :string;
  public phone : string;
  public cv : string;
  public nameButtonCV : string;


  //current job

  public business :string;
  public location : string;
  public position :string;
  public frontend : string;
  public backend : string;
  public startDate : string;
  public data : any;

  public language :string;

  constructor(
    private http : HttpClient
  ) {

    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";

    this.language = localStorage.getItem('language');

    this.cv = "https://marlonomar.github.io/portafolios/assets/documents/marlonGuerrero-"+this.language+".pdf";
    
    http.get(routeJson + this.language +'.json').subscribe(resp =>{

      this.data = resp;
      this.name = this.data.user.completName;
      this.title = 'Fron-End Javascript Developer';
      this.phone = this.data.contact.phone;
      this.linkedin = this.data.contact.linkedin;
      this.github = this.data.contact.github;
      this.nameButtonCV = this.data.site.components.buttonNameCV;

  });

  }

  ngOnInit() {
  }

}
