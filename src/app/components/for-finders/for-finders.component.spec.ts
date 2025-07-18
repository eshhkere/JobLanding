import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForFindersComponent } from './for-finders.component';

describe('ForFindersComponent', () => {
  let component: ForFindersComponent;
  let fixture: ComponentFixture<ForFindersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForFindersComponent]
    });
    fixture = TestBed.createComponent(ForFindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
