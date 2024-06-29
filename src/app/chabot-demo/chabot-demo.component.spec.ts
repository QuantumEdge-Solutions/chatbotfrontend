import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChabotDemoComponent } from './chabot-demo.component';

describe('ChabotDemoComponent', () => {
  let component: ChabotDemoComponent;
  let fixture: ComponentFixture<ChabotDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChabotDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChabotDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
