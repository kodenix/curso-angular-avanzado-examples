import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRoute2Component } from './child-route2.component';

describe('ChildRoute2Component', () => {
  let component: ChildRoute2Component;
  let fixture: ComponentFixture<ChildRoute2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildRoute2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildRoute2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
