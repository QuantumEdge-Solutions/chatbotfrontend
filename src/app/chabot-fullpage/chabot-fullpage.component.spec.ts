import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChabotFullpageComponent } from './chabot-fullpage.component';

describe('ChabotFullpageComponent', () => {
  let component: ChabotFullpageComponent;
  let fixture: ComponentFixture<ChabotFullpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChabotFullpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChabotFullpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
