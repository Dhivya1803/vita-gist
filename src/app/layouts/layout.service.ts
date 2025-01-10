import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }
  private sidebarCollapsed = new BehaviorSubject<boolean>(false);
  sidebarCollapsed$ = this.sidebarCollapsed.asObservable();

  toggleSidebar() {
    this.sidebarCollapsed.next(!this.sidebarCollapsed.value);

  }
}
