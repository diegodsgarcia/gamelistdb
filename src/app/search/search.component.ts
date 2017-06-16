import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamelistService } from './../providers/gamelist.service';
import { Subject, Observable } from "rxjs";

import { NavigationService } from './../providers/navigation.service';
import { GameModel } from './../models/game';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  games: GameModel[];
  keyup: Subject<string>;

  constructor(
    private gamelistService: GamelistService,
    private navigationService: NavigationService) {
    this.keyup = new Subject<string>();
  }

  ngOnInit() {
    this.navigationService.backButton.emit(false);
    this.searchInput()
  }

  searchInput() {
    this.keyup
      .map((keyup : any) => keyup.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((value) => {
        this.searchGame(value);
      })

  }

  searchGame(value) {
    this.gamelistService.searchGame(value).then((games : GameModel[]) => {
      this.games = games;
    }).catch((error) => {
      this.games = null;
    })
  }

  ngOnDestroy() {
    this.keyup.unsubscribe();
  }



}
