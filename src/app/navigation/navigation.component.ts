import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from './../providers/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  backButton;

  constructor(
    private router: ActivatedRoute,
    private navigationService: NavigationService) {
      this.backButton = this.navigationService.backButton;
    }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
