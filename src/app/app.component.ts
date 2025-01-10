import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from './layouts/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'vita-gist';
  showLayout: boolean = true;
  noLayoutRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  private authSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private router: Router, 
    public layoutService: LayoutService, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the current route is in the no-layout routes
      this.showLayout = !this.noLayoutRoutes.includes(event.urlAfterRedirects);
    });

    this.checkAuthStatus();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkAuthStatus() {
    this.authSubscription = this.authService.currentUser.subscribe((user: any) => {
      if (user) {
        this.showLayout = true;
      } else {
        this.showLayout = false;
        if (!this.noLayoutRoutes.includes(this.router.url)) {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}

