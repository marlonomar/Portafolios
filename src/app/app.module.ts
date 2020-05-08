import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { IntroComponent } from './components/intro/intro.component';
import { CategoryTitleComponent } from './components/category-title/category-title.component';
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { CategorySubtitleComponent } from './components/category-subtitle/category-subtitle.component';
import { PreviousJobsComponent } from './components/previous-jobs/previous-jobs.component';
import { EducationComponent } from './components/education/education.component';
import { LenguajeComponent } from './components/lenguaje/lenguaje.component';
import { ProyectsComponent } from './components/proyects/proyects.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalInformationComponent,
    IntroComponent,
    CategoryTitleComponent,
    AbilitiesComponent,
    CategorySubtitleComponent,
    PreviousJobsComponent,
    EducationComponent,
    LenguajeComponent,
    ProyectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
