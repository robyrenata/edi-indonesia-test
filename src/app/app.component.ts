import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CacheService } from "./shared/services/cache.service";
import { Router } from "@angular/router";
import { GlobalService } from "./shared/services/global.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cache: CacheService,
    private router: Router,
    private gs: GlobalService
  ) {
    this.initializeApp();
    this.cache.getStorage("edi-user").then((res) => {
      res ? this.gs.userEdi.next(res) : this.router.navigate(["/boarding"]);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
