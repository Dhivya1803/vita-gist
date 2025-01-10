import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medication } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private medications: Medication[] = [
    {
      id: '1',
      name: 'Paracetamol XY12',
      dosage: '250 mg',
      time: '08:00 AM',
      instructions: 'Before Breakfast',
      icon: 'medication-icon-1'
    },
    {
      id: '2',
      name: 'Cipla citrin Y67',
      dosage: '250 mg',
      time: '10:00 AM',
      instructions: 'After Breakfast',
      icon: 'medication-icon-2'
    },
    // Add more medications...
  ];

  getTodaysMedications(): Observable<Medication[]> {
    return of(this.medications);
  }
  constructor() { }
}
