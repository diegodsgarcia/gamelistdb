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
  games: any;
  keyup: Subject<string>;
  isLoading: boolean;

  constructor(
    private gamelistService: GamelistService,
    private navigationService: NavigationService) {
      this.keyup = new Subject<string>();
  }

  ngOnInit() {
    this.navigationService.backButton.emit(false);
    this.games = this.gamelistService.games;
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
      this.gamelistService.games = games;
      this.games = this.gamelistService.games;
      this.isLoading = false;
    }).catch((error) => {
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.keyup.unsubscribe();
  }



}
