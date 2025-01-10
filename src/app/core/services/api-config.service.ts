import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly config = environment;

  getDigiCofferUrl(endpoint: string): string {
    return `${this.config.apis.digicoffer.baseUrl}${this.getDigiCofferEndpoint(endpoint)}`;
  }

  getVitagistUrl(endpoint: string): string {
    return `${this.config.apis.vitagist.baseUrl}${this.getVitagistEndpoint(endpoint)}`;
  }

  private getDigiCofferEndpoint(key: string): string {
    const endpoints = this.config.apis.digicoffer.endpoints;
    return this.getNestedValue(endpoints, key) || '';
  }

  private getVitagistEndpoint(key: string): string {
    const endpoints = this.config.apis.vitagist.endpoints;
    return this.getNestedValue(endpoints, key) || '';
  }

  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
  }

  get authConfig() {
    return this.config.auth;
  }

  get googleAuthConfig() {
    return this.config.googleAuth;
  }
}
