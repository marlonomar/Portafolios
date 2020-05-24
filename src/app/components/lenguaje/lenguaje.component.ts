import { Component, OnInit } from '@angular/core';
import { Lenguaje } from '../../models/lenguaje';
import { HttpClient} from  '@angular/common/http';

declare var $ :any;

@Component({
  selector: 'app-lenguaje',
  templateUrl: './lenguaje.component.html',
  styleUrls: ['./lenguaje.component.less']
})

export class LenguajeComponent implements OnInit {
  public lenguaje : Array<Lenguaje>;
  public title : string;
  public data : any;

  //levels languages

  public native : string;
  public Advanced : string;
  public Intermediate : string;
  public Beginner : string;
  public language :string;

  constructor(
    private http : HttpClient
  ) {
    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";

    this.language = localStorage.getItem('language');
    
    http.get(routeJson + this.language +'.json').subscribe(resp =>{
      this.data = resp;
      this.title = this.data.site.categorySubTitle.languages.title;
      this.native = this.data.site.components.levels.native;
      this.Advanced = this.data.site.components.levels.Advanced;
      this.Intermediate = this.data.site.components.levels.Intermediate;
      this.Beginner = this.data.site.components.levels.Beginner;
    })

    

  }

  ngOnInit() {

    var route = 'https://marlonomar.github.io/portafolios/assets/banderas/';

    if(this.language == 'es-ES'){
      this.lenguaje = [
        new Lenguaje ('Español',100,route+'espanha.jpg','espanha'),
        new Lenguaje ('Portugues',80,route+'brazil.png','brazil'),
        new Lenguaje ('Inglés',20,route+'eeuu.jpg','eeuu')
      ];
    }

    if(this.language == 'pt-BR'){
      this.lenguaje = [
        new Lenguaje ('Espanhol',100,route+'espanha.jpg','espanha'),
        new Lenguaje ('Português',80,route+'brazil.png','brazil'),
        new Lenguaje ('Inglês',20,route+'eeuu.jpg','eeuu')
      ];
    }

    if(this.language == 'en-US'){
      this.lenguaje = [
        new Lenguaje ('Spanish',100,route+'espanha.jpg','espanha'),
        new Lenguaje ('Portuguese',80,route+'brazil.png','brazil'),
        new Lenguaje ('English',20,route+'eeuu.jpg','eeuu')
      ];
    }

  }

  progress(){
    var circle = $(".language circle");
    circle.map(function(index,circle){
        var radius = circle.r.baseVal.value;
        var circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        function setProgress(percent) {
          const offset = circumference - percent / 100 * circumference;
          circle.style.strokeDashoffset = offset;
        }

        
        var value = $(this).parents('.language .progress-circle').find('input').val();

        setProgress(value);
    })
  }

  mobileSlick(){
    var screem = window.innerWidth;
    if(screem <= 500){
      $(".language-list").slick({
        infinite: false,
        dots: true,
        arrows: false
      })

      var ulDots = {
        'display': 'table',
        'list-style': 'none',
        'padding':'0px',
        'margin': 'auto'
      }

      var liDots ={
        "display":"inline-block"
      }

      var buttons = {
        'width': '40px',
        'height': '15px',
        'background': 'rgb(211, 211, 211)',
        'border': 'none',
        'border-radius': '10px',
        'margin-right': '15px'
      }

      var active = {
        'background': '#6e48e4'
      }

      $(".slick-dots").css(ulDots);
      $(".slick-dots li").css(liDots);
      $(".slick-dots li button").html('');
      $(".slick-dots li button").css(buttons);
      $(".slick-dots .slick-active button").css(active);

      $(".slick-dots li").click(function(){
        $(".slick-dots li button").css(buttons);
        $(".slick-dots .slick-active button").css(active);
      })


    }
  }


  ngAfterViewInit(){
    this.progress();
    this.mobileSlick();
  }

}
