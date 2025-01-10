// src/app/topbar/topbar.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  currentPage = 'Dashboard';
  user: any;
  notificationCount = 2;
  showNotifications = false;
  showProfileMenu = false;
  selectedCountry!: { code: string, name: string, flag: string };

  constructor(
    private userService: UserService,
    private pageService: PageService  // Inject PageService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.selectedCountry = {
        code: user.countryCode,
        name: user.countryName,
        flag: user.countryFlag
      };
    });

    // Subscribe to the current page changes
    this.pageService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showProfileMenu = false;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifications = false;
  }
}
