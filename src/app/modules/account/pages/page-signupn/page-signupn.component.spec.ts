import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSignupnComponent } from './page-signupn.component';

describe('PageSignupnComponent', () => {
  let component: PageSignupnComponent;
  let fixture: ComponentFixture<PageSignupnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSignupnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSignupnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
