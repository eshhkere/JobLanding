import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForEmployersComponent } from './for-employers.component';

describe('ForEmployersComponent', () => {
  let component: ForEmployersComponent;
  let fixture: ComponentFixture<ForEmployersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForEmployersComponent]
    });
    fixture = TestBed.createComponent(ForEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
