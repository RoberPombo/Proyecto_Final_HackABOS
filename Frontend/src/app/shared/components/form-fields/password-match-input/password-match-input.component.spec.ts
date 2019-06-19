import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordMatchInputComponent } from './password-match-input.component';

describe('PasswordMatchInputComponent', () => {
  let component: PasswordMatchInputComponent;
  let fixture: ComponentFixture<PasswordMatchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordMatchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordMatchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
