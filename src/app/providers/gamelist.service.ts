import { GameModel } from './../models/game';
import { Injectable } from '@angular/core';

import thegamesdb from 'thegamesdb';
import { Observable } from "rxjs/Observable";

@Injectable()
export class GamelistService {
  game : GameModel;
  games: GameModel[];

  constructor() {
    this.game = new GameModel();
  }

  searchGame(nameValue: string) {
    return new Promise((resolve, reject) => {
      thegamesdb.getGamesList({ name: nameValue})
        .then(getGamesImages)
        .then(filterGamesImages)
        .then(resolveGames)
        .catch(rejectGames)

      function getGamesImages(games) {
        return new Promise((resolve, reject) => {
          for(let i = 0; i < games.length; i++) {
            console.log(i);
            thegamesdb.getGameArt({ id: games[i].id }).then((gameArt) => {
              games[i].images = gameArt;
              games[i].urlImage = 'http://thegamesdb.net/banners/';

              if(games.length == (i + 1)) {
                resolve(games);
              }
            }).catch((error) => {
              resolve(games);
            });
          }

        });
      }

      function filterGamesImages(games) {
        return new Promise((resolve) => {
          games.forEach((game, index) => {
            let image = null;
            for(let i = 0; i < game.images.length; i++) {
              if(game.images[i].type == 'boxart') {
                image = game.images[i];
              }
            }
            game.images[0] = image;
            if(games.length == (index + 1)) {
              console.log(games);
              resolve(games);
            }
          });
        });

      }

      function resolveGames(games) {
        resolve(games)
      }

      function rejectGames(error) {
        reject(error);
      }
    });
  }

  getGameDescription(idValue: number) {
    return new Promise((resolve, reject) => {
      thegamesdb.getGame({ id: idValue}).then((game) => {
        this.game.id = game.id;
        this.game.title = game.title;
        this.game.platform = game.platform;
        this.game.releaseDate = game.releaseDate;
        this.game.overview = game.overview;
        this.game.genres = game.genres;
        this.game.developer = game.developer;
        this.game.rating = game.rating;
        this.game.publisher = game.publisher;
        this.game.images = game.images;

        resolve(this.game);
      }).catch((error) => {
        reject(error);
      })
    });
  }



}
