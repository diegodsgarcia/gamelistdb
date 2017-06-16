export class GameModel {
  id: number;
  title: string;
  platform: string;
  releaseDate: Date;
  overview: string;
  developer: string;
  publisher: string;
  rating: number;
  genres: any[];
  youtube: string;
  images: any[];
  urlImage : string;

  constructor() {
    this.urlImage = 'http://thegamesdb.net/banners/';
  }

}
