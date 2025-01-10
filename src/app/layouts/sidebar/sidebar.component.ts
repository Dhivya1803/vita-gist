import { Observable } from "rxjs/internal/Observable";
import { LayoutService } from "../layout.service";
import { PageService } from "../../core/services/page.service";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed$: Observable<boolean>;

  constructor(
    private layoutService: LayoutService,
    private pageService: PageService,
    private authService: AuthService, // Ensure this is implemented
    private router: Router
  ) {
    this.isCollapsed$ = this.layoutService.sidebarCollapsed$;
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  onOptionClick(page: string) {
    this.pageService.setCurrentPage(page);
    this.router.navigate([`/${page.toLowerCase()}`]);
  }

  onLogout(): void {
    this.authService.logout(); // Handle session cleanup
    this.router.navigate(['/login']);
  }
}
