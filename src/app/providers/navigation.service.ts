import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationService {
  backButton : EventEmitter<boolean>;

  constructor() {
    this.backButton = new EventEmitter<boolean>();
   }

}
