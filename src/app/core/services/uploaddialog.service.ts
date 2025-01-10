import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Document } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UploaddialogService {
  private uploadProgress = new BehaviorSubject<number>(0);
  private uploadStatus = new BehaviorSubject<'idle' | 'uploading' | 'completed' | 'error'>('idle');

  constructor(private http: HttpClient) {}

  uploadDocument(file: File, metadata: Partial<Document>): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    return this.http.post<Document>('/api/documents/upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 0;
            this.uploadProgress.next(progress);
            this.uploadStatus.next('uploading');
            return null; // This null is filtered later
          case HttpEventType.Response:
            this.uploadStatus.next('completed');
            return event.body as Document; // Ensure correct type is returned
          default:
            return null; // Handle other events
        }
      }),
      filter((response): response is Document => response !== null) // Filter out null values
    );
  }

  getUploadProgress(): Observable<number> {
    return this.uploadProgress.asObservable();
  }

  getUploadStatus(): Observable<'idle' | 'uploading' | 'completed' | 'error'> {
    return this.uploadStatus.asObservable();
  }

  resetUpload(): void {
    this.uploadProgress.next(0);
    this.uploadStatus.next('idle');
  }
}
