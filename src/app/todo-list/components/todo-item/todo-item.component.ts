import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '@models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  isEditMode = false;

  @Input() item: Todo;
  @Output() updateItem = new EventEmitter<Todo>();
  @Output() deleteItem = new EventEmitter<number>();

  enableEdit(): void {
    this.isEditMode = true;
  }

  update(item: Todo): void {
    this.updateItem.emit(item);
    this.isEditMode = false;
  }

  delete(): void {
    this.deleteItem.emit(this.item.id);
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }
}
