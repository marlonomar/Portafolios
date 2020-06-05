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

  }

  ngOnInit() {
    if(this.language == 'es-ES'){
        this.jobs =[ 
            new Job ('Front-End Developer','Accenture','2019','Front-End Javacript Developer.','Recife-PE , Brasil'),
            new Job ('Diseñador Grafico','Grafica rapida Oasis','2018','Diseñador grafico con CorelDraw , artes y publicidad.',' Boa Viagem Recife-PE , Brasil'),
            new Job('Técnico en redes Inhalambricas','Byte x Byte C.A.','2017','Tecnico de redes inhalambricas para  instalación de internet. ','San Juan de Lagunillas Estado Mérida - Venezuela'),
            new Job ('Técnico de Informática','  CYBER TONY´S','2016','Técnico de repacion de computadoras.','San Juan de Lagunillas Estado Mérida – Venezuela'),
            new Job ('Técnico de Informática',' Alcaldia del Municipio Simón Rodríguez','2015','Técnico de repacion de computadoras.','San Simón Estado Táchira – Venezuela')
        ];
    }

    if(this.language == 'pt-BR'){
        this.jobs =[ 
            new Job ('Front-End Developer','Accenture','2019','Front-End Javacript Developer.','Recife-PE , Brasil'),
            new Job ('Designer gráfico','Grafica rapida Oasis','2018','Designer gráfico com CorelDraw, artes e publicidade.',' Boa Viagem Recife-PE , Brasil'),
            new Job('Técnico de rede','Byte x Byte C.A.','2017','Técnico de rede sem fio para instalação na Internet.','San Juan de Lagunillas Estado Mérida - Venezuela'),
            new Job ('Técnico em Informática','  CYBER TONY´S','2016','Técnico em manutenção de computadoras.','San Juan de Lagunillas Estado Mérida – Venezuela'),
            new Job ('Técnico em Informática',' Alcaldia del Municipio Simón Rodríguez','2015','Técnico em manutenção de computadoras.','San Simón Estado Táchira – Venezuela')
        ];
    }

    if(this.language == 'en-US'){
        this.jobs =[ 
            new Job ('Front-End Developer','Accenture','2019','Front-End Javacript Developer.','Recife-PE , Brazil'),
            new Job ('Graphic designer','Grafica rapida Oasis','2018','Graphic designer with CorelDraw, arts and publicity.',' Boa Viagem Recife-PE , Brazil'),
            new Job('Wireless Network Technician','Byte x Byte C.A.','2017','Wireless network technician for internet installation.','San Juan de Lagunillas Estado Mérida - Venezuela'),
            new Job ('Computer Technician','  CYBER TONY´S','2016','.','San Juan de Lagunillas Estado Mérida – Venezuela'),
            new Job ('Computer Technician',' Alcaldia del Municipio Simón Rodríguez','2015','Computer repair technician.','San Simón Estado Táchira – Venezuela')
        ];
    }

    
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
