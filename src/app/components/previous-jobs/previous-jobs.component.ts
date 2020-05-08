import { Component, OnInit } from '@angular/core';
import {Job} from '../../models/jobs';
import { HttpClient} from  '@angular/common/http';

declare var $ : any ;

@Component({
  selector: 'app-previous-jobs',
  templateUrl: './previous-jobs.component.html',
  styleUrls: ['./previous-jobs.component.less']
})
export class PreviousJobsComponent implements OnInit {
  public jobs : Array<Job>;
  public seeMoreButton : string;
  public data : any;
  public language :string;
  constructor(
    private http : HttpClient
  ) {
    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";
    this.language = localStorage.getItem('language');
    
    http.get(routeJson + this.language +'.json').subscribe(resp =>{
      this.data = resp;
      this.seeMoreButton = this.data.site.components.seeMoreButton;
    });

    this.jobs =[
      new Job ('Diseñador Grafico','Grafica rapida Oasis','2018','Diseñador grafico con CorelDraw , artes y publicidad.',' Boa Viagem Recife-PE , Brazil'),
      new Job('Técnico en redes Inhalambricas','Byte x Byte C.A.','2017','Tecnico de redes inhalambricas para  instalación de internet. ','San Juan de Lagunillas Estado Mérida - Venezuela'),
      new Job ('Técnico de Informática','  CYBER TONY´S','2016','Técnico de repacion de computadoras.','San Juan de Lagunillas Estado Mérida – Venezuela'),
      new Job ('Técnico de Informática',' Alcaldia del Municipio Simón Rodríguez','2015','Técnico de repacion de computadoras.','San Simón Estado Táchira – Venezuela')
    ];
  }

  ngOnInit() {
  }

  seeMore(){
    var seemoreButton = $(".previos-jobs .seemore-button");
    var items = $(".jobs-item");
    seemoreButton.click(function(){
      items.show();
      seemoreButton.remove();
    });
  }

  ngAfterViewInit(){
    this.seeMore();
  }

}
