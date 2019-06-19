import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptiveFieldComponent } from './adaptive-field.component';

describe('AdaptiveFieldComponent', () => {
  let component: AdaptiveFieldComponent;
  let fixture: ComponentFixture<AdaptiveFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaptiveFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptiveFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
