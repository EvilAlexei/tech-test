import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import { FilterEL, Filters } from '@models/filters.model';
import { TodoStatus } from '@models/todo-status.enum';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, OnChanges {
  filters: Filters = new Filters();
  statusesMap: FilterEL[] = [];
  categoriesMap: FilterEL[] = [];

  @Input() categories: Set<string>;
  @Output() updateFilters = new EventEmitter<Filters>();

  ngOnInit() {
    const values = Object.values(TodoStatus);
    this.statusesMap = values.map(value => ({
      value,
      selected: value === this.filters.todoStatus
    }));
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('categories' in changes) {
      const categories = Array.from(this.categories);

      this.categoriesMap = categories.map(value => ({
        value,
        selected: false
      }));
    }
  }

  filterByCategory(category: FilterEL): void {
    this.categoriesMap.forEach(item => item.selected = false);
    category.selected = true;

    this.filters.category = category.value;
    this.updateFilters.emit(this.filters);
  }

  filterByStatus(status: FilterEL): void {
    this.statusesMap.forEach(item => item.selected = false);
    status.selected = true;

    this.filters.todoStatus = status.value as TodoStatus;
    this.updateFilters.emit(this.filters);
  }

  clearFilters(): void {
    this.filters = new Filters();
    this.updateFilters.emit(this.filters);

    this.categoriesMap.forEach(item => item.selected = item.value === this.filters.category);
    this.statusesMap.forEach(item => item.selected = item.value === this.filters.todoStatus);
  }

  trackByFn(index: number): number {
    return index;
  }
}
