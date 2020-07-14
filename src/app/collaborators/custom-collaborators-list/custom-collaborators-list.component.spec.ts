import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCollaboratorsListComponent } from './custom-collaborators-list.component';

describe('CustomCollaboratorsListComponent', () => {
  let component: CustomCollaboratorsListComponent;
  let fixture: ComponentFixture<CustomCollaboratorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCollaboratorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
