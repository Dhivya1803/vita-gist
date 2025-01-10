import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudittrailsComponent } from './audittrails.component';

describe('AudittrailsComponent', () => {
  let component: AudittrailsComponent;
  let fixture: ComponentFixture<AudittrailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudittrailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudittrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
