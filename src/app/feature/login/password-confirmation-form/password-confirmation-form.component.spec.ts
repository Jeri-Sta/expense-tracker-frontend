import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirmationFormComponent } from './password-confirmation-form.component';

describe('PasswordConfirmationFormComponent', () => {
  let component: PasswordConfirmationFormComponent;
  let fixture: ComponentFixture<PasswordConfirmationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConfirmationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
