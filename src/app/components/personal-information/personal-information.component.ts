import { Component, OnInit } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

declare var $ :any;

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.less']
})
export class PersonalInformationComponent implements OnInit {
 
  public location : string;
  public name : string;
  public data : any;

  public language :string;
  public selectLanguages : string;
  public spanish : string;
  public spanishIcone : string;
  public portuguese : string;
  public portugueseIcone : string;
  public english : string;
  public englishIcone : string;

  constructor(
    private http : HttpClient
  ) {

    this.language = localStorage.getItem('language');

    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";
    var pictureRoute = "https://marlonomar.github.io/portafolios/assets/banderas/";

    this.spanishIcone = pictureRoute + 'espanha-ball.png';
    this.portugueseIcone = pictureRoute + 'brazil-ball.png';
    this.englishIcone = pictureRoute + 'eeuu-ball.png';
    
    
    http.get(routeJson + this.language +'.json').subscribe(resp =>{
      this.data = resp;

      //information
      this.location = 'Recife / Brazil'
      this.name = this.data.user.name;
      //site 
      this.selectLanguages = this.data.site.components.selectLanguages;
      this.spanish = this.data.site.languages.spanish;
      this.portuguese = this.data.site.languages.portuguese;
      this.english = this.data.site.languages.english;
      
    })

  }

  ngOnInit() {
  }

  navBar(){
    var titles = $(".title-category .title");
    titles.map(function(index,data){
      if(window.innerWidth <= 500){
        $(".navbar-nav").append("<li class='nav-item' section='#"+data.innerText+"' data-target='#navbarSupportedContent' data-toggle='collapse' ><a class='nav-link'>"+data.innerText+"</a></li>");
      }else{
        $(".navbar-nav").append("<li class='nav-item' section='#"+data.innerText+"'><a class='nav-link'>"+data.innerText+"</a></li>");
      }
      
    });

    $(".nav-item a , .navbar-brand").css({"cursor":"pointer"})

    $('.nav-item , .navbar-brand ').on('click',function(e){
      e.preventDefault();
      var id = $(this).attr('section');
      var section = $(id).offset().top;
      $('html, body').animate({
        scrollTop: section - 70
      },500);
    });

  }

  languagesMenu(){

    function menu (){
        $("#options").toggle('slow');
        $(".select-box .fa-chevron-up").toggle();
        $(".select-box .fa-chevron-down").toggle();
    }

    $("#language").click(function(){
       menu ();
    });

    $(".select-box .option").click(function(){
      $(".select-box .option").removeClass('active');
      $(this).addClass('active');
      var lang = $(this).attr('lang');
      localStorage.setItem('language', lang);
      menu ();
      window.location.reload();
    });

  }


  ngAfterViewInit(){
    this.navBar();
    this.languagesMenu();
  }

}
