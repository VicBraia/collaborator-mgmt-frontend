import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSectorsListComponent } from './custom-sectors-list.component';

describe('CustomSectorsListComponent', () => {
  let component: CustomSectorsListComponent;
  let fixture: ComponentFixture<CustomSectorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSectorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSectorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
