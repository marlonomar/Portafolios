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

      var skills = this.data.skills;
    
      this.abilities = [];

      for (let i = 0; i < skills.length; i++) {
        this.abilities.push(new Abilitie(skills[i].name, skills[i].picture , skills[i].category , skills[i].study ))
      }

    });

  }

  
  progress(){
    var circle = $(".abilities circle");
    console.log(circle)
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

      var arrowDown = document.querySelector(".arrow .down");
      var arrowUp = document.querySelector(".arrow .up");
      var container = $(".abilities-list");
      var time = 4000;

      arrowDown.addEventListener('click',function(){
        container.animate({ 'scrollTop': '5000px'}, time);
      });

      arrowUp.addEventListener('click',function(){
        container.animate({ 'scrollTop': '0px'}, time);
      });

  }

  ngOnInit() {  
    
  }

  ngAfterViewInit(){
    this.titleSize();
    this.filter();
    this.scroll();
    this.progress();
    
  }


}
