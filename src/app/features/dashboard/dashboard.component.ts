// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  timing: string;
  dueTime: string;
  icon: string;
}

interface Document {
  id: number;
  name: string;
  expiryDays: string;
  icon: string;
  country: string;
}

interface Connection {
  id: number;
  name: string;
  timeAgo: string;
  avatar: string;
  visible: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    console.log('DashboardComponent initialized');
  }
  currentTime$ = interval(1000).pipe(
    map(() => new Date())
  );
  
  activeTab = {
    health: 'Medication',
    documents: 'India',
    connections: 'Friends & Family'
  };

  medications: Medication[] = [
    { 
      id: 1,
      name: 'Paracetamol XY12', 
      dosage: '250 mg', 
      timing: 'Before Breakfast', 
      dueTime: '08:00 AM',
      icon: '💊'
    },
    { 
      id: 2,
      name: 'Cipla citrin Y67', 
      dosage: '250 mg', 
      timing: 'After Breakfast', 
      dueTime: '10:00 AM',
      icon: '💊'
    },
    { 
      id: 3,
      name: 'Azithromycin', 
      dosage: '250 mg', 
      timing: 'After Lunch', 
      dueTime: '02:30 PM',
      icon: '💊'
    },
    { 
      id: 4,
      name: 'Azithromycin', 
      dosage: '250 mg', 
      timing: 'After Lunch', 
      dueTime: '02:30 PM',
      icon: '💊'
    },
    { 
      id: 5,
      name: 'Azithromycin', 
      dosage: '250 mg', 
      timing: 'After Lunch', 
      dueTime: '02:30 PM',
      icon: '💊'
    }
  ];

  documents: Document[] = [
    { 
      id: 1,
      name: 'Passport_doc.png', 
      expiryDays: 'Expiring in 2 days', 
      icon: '📄',
      country: 'India'
    },
    { 
      id: 2,
      name: 'LifeInsurance.pdf', 
      expiryDays: 'Expiring in 4 days', 
      icon: '📄',
      country: 'India'
    },
    { 
      id: 3,
      name: 'RentalAgreement.pdf', 
      expiryDays: 'Expiring in 1 week', 
      icon: '📄',
      country: 'India'
    }
  ];

  connections: Connection[] = [
    { 
      id: 1,
      name: 'Maddy John', 
      timeAgo: '3 mins ago', 
      avatar: '/assets/images/maddy.png',
      visible: true
    },
    { 
      id: 2,
      name: 'Barry Ken', 
      timeAgo: '5 mins ago', 
      avatar: '/assets/images/barry.png',
      visible: true
    },
    { 
      id: 3,
      name: 'Jacob Jones', 
      timeAgo: '25 mins ago', 
      avatar: '/assets/images/jacob.png',
      visible: true
    },{
      id: 4,
      name: 'Harry Potter', 
      timeAgo: '45 mins ago', 
      avatar: '/assets/images/profile.png',
      visible: true
    }
  ];

  setActiveTab(section: keyof typeof this.activeTab, tab: string) {
    this.activeTab[section] = tab;
  }

  removeConnection(id: number) {
    const connection = this.connections.find(c => c.id === id);
    if (connection) {
      connection.visible = false;
    }
  }

  acceptConnection(id: number) {
    console.log(`Accepted connection: ${id}`);
  }

  navigateToViewAll(section: string) {
    console.log(`Navigating to view all ${section}`);
  }

  exploreCalendar() {
    console.log('Exploring calendar');
  }

  startChat() {
    console.log('Starting chat');
  }
}