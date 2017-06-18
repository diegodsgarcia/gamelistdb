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
  isLoading: boolean;

  constructor(
    private gamelistService: GamelistService,
    private navigationService: NavigationService) {
    this.keyup = new Subject<string>();
  }

  ngOnInit() {
    this.navigationService.backButton.emit(false);
    this.isLoading = false;
    this.searchInput()
  }

  searchInput() {
    this.keyup
      .map((keyup : any) => keyup.target.value)
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((value) => {
        this.isLoading = true;
        this.searchGame(value);
      })

  }

  searchGame(value) {
    this.gamelistService.searchGame(value).then((games : GameModel[]) => {
      this.games = games;
      this.isLoading = false;
    }).catch((error) => {
      this.games = null;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.keyup.unsubscribe();
  }



}
