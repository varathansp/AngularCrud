import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd ,NavigationCancel,NavigationError} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCrud';
  showLodingIndiactor = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLodingIndiactor = true;
      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel||
        routerEvent instanceof NavigationError) {
        this.showLodingIndiactor = false;
      }
    });
  }

}
