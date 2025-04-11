import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { CategoryComponent } from './category/category.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BankComponent } from './bank/bank.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardComponent } from './card/card.component';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { TabsModule } from 'primeng/tabs';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { AuthenticationComponent } from './login/authentication.component';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { PasswordRecoveryFormComponent } from './login/password-recovery-form/password-recovery-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [
    CategoryComponent,
    BankComponent,
    CardComponent,
    DashboardComponent,
    IncomeComponent,
    ExpenseComponent,
    AuthenticationComponent,
    LoginFormComponent,
    PasswordRecoveryFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    PanelModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ColorPickerModule,
    ToggleSwitchModule,
    DatePickerModule,
    SelectModule,
    CardModule,
    SelectButtonModule,
    TabsModule,
    ChartModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    RouterModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
})
export class FeatureModule {}
