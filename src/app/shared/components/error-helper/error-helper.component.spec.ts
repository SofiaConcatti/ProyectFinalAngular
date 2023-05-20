import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHelperComponent } from './error-helper.component';

describe('ErrorHelperComponent', () => {
  let component: ErrorHelperComponent;
  let fixture: ComponentFixture<ErrorHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorHelperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});