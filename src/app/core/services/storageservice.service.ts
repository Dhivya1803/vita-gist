import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageserviceService {

  private inMemoryStorage: { [key: string]: string } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getItem(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return this.inMemoryStorage[key] || null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    } else {
      this.inMemoryStorage[key] = value;
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    } else {
      delete this.inMemoryStorage[key];
    }
  }

  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }
}
