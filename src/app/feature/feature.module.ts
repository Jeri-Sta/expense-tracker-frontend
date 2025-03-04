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

@NgModule({
  declarations: [
    CategoryComponent,
    BankComponent,
    CardComponent,
    DashboardComponent,
    IncomeComponent,
    ExpenseComponent,
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
  ],
})
export class FeatureModule {}
