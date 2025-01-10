import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface User {
  countryName: string;
  countryFlag: string;
  countryCode: string;
  id: string;
  name: string;
  email: string;
  avatar: string;
  isNewUser: boolean;
  country: string;
}

// src/app/core/models/medication.model.ts
export interface Medication {
  id:string;
  name: string;
  dosage: string;
  instructions: string;
  time:string;
  icon:string;
}
// export interface Document{
//   docname: string;
//   type:string;
//   expiresIn: string;
//   icon: string;
// }
export interface Connection{
  name:string;
  id:number;
  timeAgo: string;
  imageurl: string;
}

export interface DocumentTypeCard {
  id: string;
  title: string;
  count: number;
  icon: string;
  isActive: boolean;
  color?: string;
}
// models/document.interface.ts
export interface Document {
  id: string;
  name: string;
  description: string;
  category: string[];
  uploadDate: Date;
  expirationDate?: Date;
  tags: string[];
  fileSize: number;
  fileType: string;
  thumbnailUrl?: string;
  status: 'uploading' | 'completed' | 'error';
  uploadProgress?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface DocumentFilter {
  search?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  viewMode?: 'grid' | 'list';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<User>({
    id: '1',
    name: 'James Ford',
    email: 'james@gmail.com',
    avatar: '/assets/images/jacob.png ',
    isNewUser: false,
    country: 'USA',
    countryCode:'USA',
    countryFlag:'/assets/images/usa.png',
    countryName:'United States'
  });

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  updateUser(user: Partial<User>): void {
    this.currentUser.next({ ...this.currentUser.value, ...user });
  }

  constructor() { }

  
}
