// document.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Document {
  id: string;
  name: string;
  category: string[];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  private documentsSubject = new BehaviorSubject<Document[]>([]);

  constructor() {}

  getDocuments(): Observable<Document[]> {
    return this.documentsSubject.asObservable();
  }

  addDocument(document: Document): void {
    this.documents.push(document);
    this.documentsSubject.next(this.documents);
  }

  // Simulating file upload progress
  uploadDocument(file: File): Observable<number> {
    return new Observable<number>((observer) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        observer.next(progress);
        if (progress >= 100) {
          clearInterval(interval);
          observer.complete();
        }
      }, 500);
    });
  }
}