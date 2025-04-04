import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/entities/user/user.service';

@Component({
  selector: 'ex-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: false,
})
export class LoginFormComponent implements OnInit {
  formGroup!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  go(route: string) {
    this.router.navigate(['/authentication/' + route]);
  }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.formGroup = this.getFormGroup();
  }

  private getFormGroup() {
    return this.formBuilder.group({
      email: [undefined, Validators.required],
      password: [undefined, Validators.required],
      remember: [false],
    });
  }

  login(): void {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    this.userService.login(this.formGroup.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        localStorage.removeItem('token');
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
