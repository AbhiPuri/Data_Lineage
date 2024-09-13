import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedTreeHeirarchyComponent } from './nested-tree-heirarchy.component';

describe('NestedTreeHeirarchyComponent', () => {
  let component: NestedTreeHeirarchyComponent;
  let fixture: ComponentFixture<NestedTreeHeirarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedTreeHeirarchyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NestedTreeHeirarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
