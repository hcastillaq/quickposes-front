import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSessionComponent } from './image-session.component';

describe('ImageSessionComponent', () => {
  let component: ImageSessionComponent;
  let fixture: ComponentFixture<ImageSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
