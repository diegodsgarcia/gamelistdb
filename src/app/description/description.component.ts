import { GameModel } from './../models/game';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { GamelistService } from './../providers/gamelist.service';
import { NavigationService } from './../providers/navigation.service';


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.sass']
})
export class DescriptionComponent implements OnInit, OnDestroy {
  game: GameModel
  subscription: Subscription;
  thumbnail: string;

  constructor(
    private router: ActivatedRoute,
    private gamelistService: GamelistService,
    private navigationService: NavigationService) {

    }

  ngOnInit() {
    this.navigationService.backButton.emit(true);
    this.subscription = this.router.params.subscribe((params) => {
      this.getGameDescription(params['id']);
    });
  }

  getGameDescription(id) {
    this.gamelistService.getGameDescription(id)
    .then((game : GameModel) => {
      this.game = game;
    })
    .then(() => {
      this.game.images.forEach((image) => {
        if(image.type == 'boxart' && image.side =='front') {
          this.thumbnail = this.game.urlImage + image.url;
        }
      })
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
