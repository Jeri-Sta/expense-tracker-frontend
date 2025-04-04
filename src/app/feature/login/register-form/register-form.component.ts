import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/entities/user/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  standalone: false,
})
export class RegisterFormComponent implements OnInit {
  stateOptions: any[] = [
    { label: 'Normal', value: 'normal' },
    { label: 'Invited', value: 'invited' },
  ];

  formGroup!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
  }

  goBack() {
    this.router.navigate(['/authentication']);
  }

  private getFormGroup() {
    const formGroup = this.formBuilder.group({
      name: [undefined, Validators.required],
      email: [undefined, Validators.required],
      password: [undefined, Validators.required],
      ownerEmail: [undefined],
      paymentDay: [undefined, Validators.required],
      inviteCode: [undefined],
      toggleState: ['normal'],
      terms: [false, Validators.requiredTrue],
    });

    formGroup.get('toggleState')?.valueChanges.subscribe((value) => {
      if (value === 'invited') {
        formGroup.get('inviteCode')?.setValidators([Validators.required]);
        formGroup.get('paymentDay')?.clearValidators();
      } else {
        formGroup.get('paymentDay')?.setValidators([Validators.required]);
        formGroup.get('inviteCode')?.clearValidators();
      }
    });

    return formGroup;
  }

  register(): void {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.formGroup.value).subscribe({
      next: () => {
        this.router.navigate(['/authentication']);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      control?.updateValueAndValidity();
      control?.markAsDirty();
    });
  }
}
