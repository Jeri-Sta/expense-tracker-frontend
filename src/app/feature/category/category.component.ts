import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/entities/category/category.service';
import CategoryDto from '../../core/entities/category/category-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

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
  totalRecords: number = 0;
  loading: boolean = true;
  pageSize: number = 10;

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
    let paramList = {
      page: 0,
      size: this.pageSize,
      sort: [
        {
          field: 'name',
          order: 1,
        },
      ],
    };
    if (event) {
      const page = event.first! / event.rows!; // Calcula a página com base no primeiro registro
      const size = event.rows!;
      paramList = {
        ...paramList,
        page: page,
        size: size,
      };
    }
    this.categoryService.list(paramList).subscribe((data: any) => {
      this.data = data.content;
      this.totalRecords = data.totalElements; // Define o total de registros para paginação
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

  onPageChange(event: any) {
    console.log(event);
  }
}
