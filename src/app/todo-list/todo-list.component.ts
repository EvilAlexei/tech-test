import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Filters } from '@models/filters.model';
import { TodoStatus } from '@models/todo-status.enum';
import { Todo } from '@models/todo.model';
import { TodoListService } from '@services/todo-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  items: Todo[] = [];
  filteredItems: Todo[] = [];
  categories: Set<string> = new Set('');
  filters: Filters = new Filters();
  todoListSub$: Subscription;

  constructor(
    private readonly todoListService: TodoListService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.todoListSub$ = this.todoListService.todoList$.subscribe(data => {
      this.items = data;
      this.filteredItems = this.applyFilters(this.items);
      this.categories = this.getCategories(data);
      this.cdr.markForCheck();
    });
    this.todoListService.getItems();
  }

  createItem(item: Todo): void {
    this.todoListService.addItem(item);
  }

  updateItem(item: Todo): void {
    this.todoListService.updateItem(item);
  }

  deleteItem(itemId: number): void {
    this.todoListService.deleteItem(itemId);
  }

  getCategories(list: Todo[]): Set<string> {
    return new Set(list.map(({ category }) => category));
  }

  filterList(filters: Filters): void {
    this.filters = filters;
    this.filteredItems = this.applyFilters(this.items);
  }

  applyFilters(list: Todo[]): Todo[] {
    return list.filter(item => {
      const filteredByCategory = this.filters.category ? item.category === this.filters.category : true;
      let filteredByStatus: boolean;

      switch (this.filters.todoStatus) {
        case (TodoStatus.ACTIVE):
          filteredByStatus = !item.done;
          break;
        case (TodoStatus.DONE):
          filteredByStatus = item.done;
          break;
        case (TodoStatus.ALL):
        default:
          filteredByStatus = true;
      }

      return filteredByStatus && filteredByCategory;
    });
  }

  trackByFn(index: number, item: Todo): number {
    if (item && item.id) {
      return item.id;
    }

    return index;
  }

  ngOnDestroy(): void {
    this.todoListSub$.unsubscribe();
  }
}
