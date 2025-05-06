import { Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { CategoryResponse } from './category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private $base: BaseService) {}

  getAll() {
    return this.$base.get<CategoryResponse[]>('category');
  }

  delete(id: number) {
    return this.$base.delete('category', id);
  }
}
