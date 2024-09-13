import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeLoaderComponent } from './tree-loader.component';

describe('TreeLoaderComponent', () => {
  let component: TreeLoaderComponent;
  let fixture: ComponentFixture<TreeLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
