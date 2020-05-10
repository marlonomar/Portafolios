import { Component, OnInit } from '@angular/core';
import { Abilitie } from '../../models/abilitie';
import { HttpClient} from  '@angular/common/http';

declare var $ :any;


@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.less']
})

export class AbilitiesComponent implements OnInit {
  public abilities : Array<Abilitie>;
  public language :string;
  public data : any;
  public allFiltes : string;
  public Advanced : string;
  public Intermediate : string;
  public Beginner : string;

  constructor(
    private http : HttpClient
  ) {
    var routeJson = "https://marlonomar.github.io/portafolios/assets/json/";

    this.language = localStorage.getItem('language');
    
    http.get(routeJson + this.language +'.json').subscribe(resp =>{

      this.data = resp;
      this.allFiltes = this.data.site.components.allFiltes;
      this.Advanced = this.data.site.components.levels.Advanced;
      this.Intermediate = this.data.site.components.levels.Intermediate;
      this.Beginner = this.data.site.components.levels.Beginner;
    });

    var route = 'https://marlonomar.github.io/portafolios/assets/logos/';
    this.abilities =[
      
      new Abilitie('Liferay',route +'liferay.png','cms frontend',75,''),
      new Abilitie("Angular",route + 'angular.png','frontend framework',60,''),
      new Abilitie('Node JS',route +'nodejs.png','Backend',45,''),
      new Abilitie('Oracle Commerce Cloud',route +'oracle.png','cms frontend',51,''),
      new Abilitie('Javascript',route +'javascript.png','frontend',78,''),
      new Abilitie('Jquery',route +'jquery.png','frontend',90,''),
      new Abilitie('Git',route +'git.png','control de versiones',66,''),
      new Abilitie('CSS 3',route +'css3.png','frontend',95,''),
      new Abilitie('Bootstrap',route +'bootstrap.png','frontend',87,''),
      new Abilitie('HTML 5',route +'html5.png','frontend',95,''),
      new Abilitie('LESS',route +'less.png','frontend',50,''),
      new Abilitie('Typescript',route +'typescript.png','frontend',35,''),
      new Abilitie('Mongo DB',route +'mongodb.png','dataBase',45,''),
      new Abilitie('Wordpress',route +'wordpress.png','frontend cms',8,'')
    ];
  }

  
  progress(){
    var circle = $(".abilities circle");
    circle.map(function(index,circle){
        var radius = circle.r.baseVal.value;
        var circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        function setProgress(percent) {
          const offset = circumference - percent / 100 * circumference;
          circle.style.strokeDashoffset = offset;
        }

        
        var value = $(this).parents('.abilities .progress-circle').find('input').val();

        setProgress(value);
    })
  }

  titleSize(){
   
   var titles = document.querySelectorAll(".abilities .maincontainer .title");

   titles.forEach(function(elem){

        var titleLetter = elem.textContent.length;
        if(titleLetter >= 15){
            elem.classList.add('large');
        }
   });
    
  }

  filter(){

    var listItem = document.querySelectorAll(".category-list .category-item");

    listItem.forEach(function(elem){

        elem.addEventListener('click',function(){

            var thislistItem = this;
            var filterItem = document.querySelectorAll(".abilities-item");
            var listItemContainer = document.querySelectorAll(".abilities");
            var arrows = document.querySelectorAll(".arrow");
            
            listItem.forEach(function(elem){
                elem.classList.remove('active');
            });

            thislistItem.classList.add('active');

            filterItem.forEach(function(elem){
                elem.classList.add('hide');
            });
          
            if( thislistItem.getAttribute('value') == 'all'){

                filterItem.forEach(function(elem){
                    elem.classList.remove('hide');
                });

            }else{

                var thisValeu = thislistItem.getAttribute('value');
                var element = document.querySelectorAll("."+thisValeu+"");

                element.forEach(function(elem){
                    elem.classList.remove('hide');
                });
              
            }

            function isVisible (item){

                var visible = [];

                item.forEach(function(element){

                    if(element.offsetWidth > 0 && element.offsetHeight > 0){
                        visible.push(element);
                        return visible;
                    }

                });

                function hideArrow (){
                    listItemContainer.forEach(function(elem){
                        elem.classList.remove('listSingleItem');
                    });

                    arrows.forEach(function(elem){
                        elem.classList.add('hide')
                    });
                }

                function showArrow(){
                    
                    listItemContainer.forEach(function(elem){
                        elem.classList.remove('listSingleItem');
                    });

                    arrows.forEach(function(elem){
                        elem.classList.remove('hide')
                    });
                }

                function arrow (){

                    listItemContainer.forEach(function(elem){
                        elem.classList.add('listSingleItem');
                    });

                    arrows.forEach(function(elem){
                        elem.classList.add('hide')
                    });
                }

                if(visible.length == 1){

                    arrow ();
                    
                }else if ( visible.length == 3 || visible.length == 2){

                    hideArrow ();

                }else{
                    showArrow();
                }

                if(window.innerWidth > 700){
                    
                    if(visible.length == 3){

                        hideArrow ();
                    }

                }else{

                    if(visible.length == 3){
                        showArrow();
                    }

                    if(visible.length == 2){

                        hideArrow ();
                    }
                }

            }

            isVisible (filterItem);
           
        });
    });

  }

  scroll(){
      var arrowDown = $(".arrow .down");
      var arrowUp = $(".arrow .up");
      var container = $(".abilities-list");
      var time = 4000;

      arrowDown.click(function(){
        container.animate({ 'scrollTop': '5000px'}, time);
      });

      arrowUp.click(function(){
        container.animate({ 'scrollTop': '0px'}, time);
      });

  }

  ngOnInit() {  
  }

  ngAfterViewInit(){
    this.titleSize();
    this.progress();
    this.filter();
    this.scroll();
  }


}
