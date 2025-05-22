import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/entities/category/category.service';
import CategoryDto from '../../core/entities/category/category-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import ColumnOptions from '../../components/table/column-options';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  standalone: false,
})
export class CategoryComponent implements OnInit {
  data: CategoryDto[] = [];
  formVisible = false;
  formGroup!: FormGroup;
  loading: boolean = true;
  columns: ColumnOptions[] = [
    { header: 'Nome', field: 'name' },
    { header: 'Color', field: 'color', type: 'color' },
    { header: 'Gasto fixo', field: 'fixedExpense', type: 'boolean' },
  ];

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.getCategory();
  }

  getCategory(event?: any) {
    this.loading = true;

    this.categoryService.listAll().subscribe((data: any) => {
      this.data = data;
      this.loading = false;
    });
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      color: ['#ffffff'],
      fixedExpense: [false],
      createdBy: [undefined],
      lastModifiedBy: [undefined],
      createdAt: [undefined],
      updatedAt: [undefined],
    });
  }

  newCategory() {
    this.formGroup = this.getFormGroup();
    this.formVisible = true;
  }

  editCategory(category: CategoryDto) {
    this.formVisible = true;
    this.formGroup.patchValue(category);
  }

  deleteCategory(category: CategoryDto) {
    this.categoryService.delete(category.id).subscribe((data) => {
      this.formVisible = false;
      this.getCategory();
    });
  }

  saveCategory() {
    this.validateFormGroup(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    let observable: Observable<any>;
    if (this.formGroup.get('id')?.value) {
      observable = this.updateObservaable();
    } else {
      observable = this.insertObservaable();
    }
    observable.pipe(
      catchError((error) => {
        this.loading = false;
        return error;
      })
    )
    .subscribe((data) => {
      this.loading = false;
      this.getCategory();
      this.formVisible = false;
      this.formGroup.reset();
    });
  }

  validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: any) => {
      const control = formGroup.get(field);
      control?.updateValueAndValidity();
      control?.markAsDirty();
    });
  }

  insertObservaable() {
    return this.categoryService.insert(this.formGroup.getRawValue());
  }

  updateObservaable() {
    return this.categoryService.update(
      this.formGroup.get('id')?.value,
      this.formGroup.getRawValue()
    );
  }
}
