import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ex-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrl: './password-recovery-form.component.scss',
  standalone: false,
})
export class PasswordRecoveryFormComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/authentication']);
  }
}
