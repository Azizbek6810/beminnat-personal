import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CategoryService } from './common/category.service';
import { CategoryResponse } from './common/category.models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-category',
  imports: [NzTableModule, NzDividerModule, NzPopconfirmModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent implements OnInit {
  $data = inject(CategoryService);

  data = signal<CategoryResponse[]>([]);
  // $cdr = inject(ChangeDetectorRef);

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

  log(){
    console.log(';lfjdsf')
  }
}
