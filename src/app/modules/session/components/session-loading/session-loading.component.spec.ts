import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLoadingComponent } from './session-loading.component';

describe('SessionLoadingComponent', () => {
  let component: SessionLoadingComponent;
  let fixture: ComponentFixture<SessionLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
