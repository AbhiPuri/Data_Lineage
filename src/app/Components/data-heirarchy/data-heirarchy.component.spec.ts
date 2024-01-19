import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHeirarchyComponent } from './data-heirarchy.component';

describe('DataHeirarchyComponent', () => {
  let component: DataHeirarchyComponent;
  let fixture: ComponentFixture<DataHeirarchyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataHeirarchyComponent]
    });
    fixture = TestBed.createComponent(DataHeirarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
