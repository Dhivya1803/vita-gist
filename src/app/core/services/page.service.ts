// src/app/core/services/page.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private currentPageSubject = new BehaviorSubject<string>('Dashboard');
  currentPage$: Observable<string> = this.currentPageSubject.asObservable();

  setCurrentPage(page: string) {
    this.currentPageSubject.next(page);
  }
}
