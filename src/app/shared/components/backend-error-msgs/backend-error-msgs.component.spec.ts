import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendErrorMsgsComponent } from './backend-error-msgs.component';

describe('BackendErrorMsgsComponent', () => {
  let component: BackendErrorMsgsComponent;
  let fixture: ComponentFixture<BackendErrorMsgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendErrorMsgsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendErrorMsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
