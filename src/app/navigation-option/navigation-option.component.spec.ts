import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationOptionComponent } from './navigation-option.component';

describe('NavigationOptionComponent', () => {
  let component: NavigationOptionComponent;
  let fixture: ComponentFixture<NavigationOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
