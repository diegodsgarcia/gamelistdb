import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { GamelistService } from './providers/gamelist.service';
import { NavigationService } from './providers/navigation.service';

import { DescriptionModule } from './description/description.module';
import { SearchModule } from './search/search.module';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    NavigationModule,
    SearchModule,
    DescriptionModule,
    AppRoutingModule
  ],
  providers: [
    GamelistService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
