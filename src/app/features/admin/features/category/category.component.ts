import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from './common/category.service';
import { CategoryResponse } from './common/category.models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-category',
  imports: [
    FormsModule,
    NzTableModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzInputNumberModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent implements OnInit {
  $data = inject(CategoryService);

  data = signal<CategoryResponse[]>([]);
  // $cdr = inject(ChangeDetectorRef);
  private $fb = inject(FormBuilder);
  isVisible: boolean = false;
  date = null;

  form = this.$fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    createdDate: [null, Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    // this.data = this.$data.getAll();
    this.$data.getAll().subscribe((res) => {
      if (res) {
        this.data.set(res);
      }
    });
  }

  delete(id: number) {
    this.$data.delete(id).subscribe((res) => {
      if (res) {
        // this.data = this.data.pipe(map((w) => w.filter((i) => i.id !== id)));
        this.data.update(() => {
          return this.data().filter((m) => m.id !== id);
        });
      }
    });
  }

  openModal(): void {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const value = this.form.value;
    this.$data.create(value).subscribe((res) => {
      this.data.update((prev) => {
        return [...prev, res];
      });
    });
    this.closeModal();
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
