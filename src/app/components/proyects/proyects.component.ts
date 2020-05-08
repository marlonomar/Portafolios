import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../models/proyects';
import { HttpClient} from  '@angular/common/http';

declare var $ :any;
declare var M :any;

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.less']
})
export class ProyectsComponent implements OnInit {
  public proyects: Array<Proyect>;
  public buttonSeeProject : string;
  public data : any;
  public language :string;
  constructor(
    private http : HttpClient
  ) {

    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";
    this.language = localStorage.getItem('language');

    http.get(routeJson + this.language +'.json').subscribe(resp =>{
      this.data = resp;
      this.buttonSeeProject = this.data.site.components.buttonSeeProject;
    });

    var route = 'https://marlonomar.github.io/portafolios/assets/proyects/'
    this.proyects = [
      new Proyect ('Cafeteria Guerrero',route+'cafeteria.PNG','https://marlonomar.github.io/cafeteria/','simples'),
      new Proyect ('Formulario Venezuela',route+'formulario.PNG','https://marlonomar.github.io/formulario-ve/','simples'),
      new Proyect ('Lista de Usuarios',route+'lista-usuarios.PNG','https://marlonomar.github.io/lista-de-usuarios/','simples')
    ];
  }

  ngOnInit() {
  }

  slickProyects(){
   $(".my-proyects-list").slick({
      dots:false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: false,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1.05
          }
  
        }]
    });

    $(".my-proyects-list .slick-list").css({"padding":"10px"})
   
  }

  ngAfterViewInit(){
    //this.slickProyects();
  }

}
