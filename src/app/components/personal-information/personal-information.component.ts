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
    var titles = document.querySelectorAll(".title-category .title");

    titles.forEach(function(elem){

        var navbar = document.querySelector('.navbar-nav');
        var links = "<li class='nav-item pointer' section='#"+elem.textContent+"'><a class='nav-link'>"+elem.textContent+"</a></li>";
        var linksMobile = "<li class='nav-item pointer' section='#"+elem.textContent+"' data-target='#navbarSupportedContent' data-toggle='collapse' ><a class='nav-link'>"+elem.textContent+"</a></li>";
        
        if(window.innerWidth <= 500){
            navbar.innerHTML += linksMobile;
        }else{
            navbar.innerHTML += links;
        }
       
    });

   var navElemets = document.querySelectorAll('.nav-item , .navbar-brand ');

   navElemets.forEach(function(elem){
       elem.addEventListener('click',function(e){
        e.preventDefault();
        var elem = this;
        var id = elem.getAttribute('section');
        console.log(document.querySelector(id).scrollWidth);
        var section = $(id).offset().top;
        $('html, body').animate({
          scrollTop: section - 70
        },500);
       });
   });

  }

  languagesMenu(){

    function menu (){
        var optionsMenu = document.querySelector("#options");
        var arrowUp = document.querySelector(".select-box .fa-chevron-up");
        var arrowDown = document.querySelector(".select-box .fa-chevron-down");

        if(optionsMenu.classList.contains('visible') && arrowUp.classList.contains('visible')){
            optionsMenu.classList.remove('visible');
            arrowUp.classList.remove('visible');
            arrowDown.classList.add('visible');
        }else{
            optionsMenu.classList.add('visible');
            arrowUp.classList.add('visible');
            arrowDown.classList.remove('visible');
        }
    }

    var languageButton = document.querySelector("#language");

    languageButton.addEventListener('click',function(){
        menu ();
    });

    var options = document.querySelectorAll(".select-box .option");

    options.forEach(function(elem){
        elem.addEventListener('click',function(){
            var lang = this.getAttribute('lang');
            localStorage.setItem('language', lang);
            menu ();
            window.location.reload();
        });
    });
  
  }

  ngAfterViewInit(){
    this.navBar();
    this.languagesMenu();
  }

}
