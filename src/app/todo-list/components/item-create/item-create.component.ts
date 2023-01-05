import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Todo } from '@models/todo.model';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCreateComponent implements OnChanges {
  form = new FormGroup({
    label: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl(''),
  });

  @Input() todo: Todo = new Todo();
  @Output() createItem = new EventEmitter<Todo>();
  @Output() updateItem = new EventEmitter<Todo>();
  @Output() cancelEdit = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if ('todo' in changes) {
      this.form.patchValue({
        label: this.todo.label,
        description: this.todo.description,
        category: this.todo.category
      });
    }
  }

  submit(): void {
    const todo = Object.assign({}, this.todo, this.form.value);

    if (todo.id) {
      this.updateItem.emit(todo);
    } else {
      this.createItem.emit(todo);
      this.clearForm();
    }
  }

  cancel(): void {
    this.cancelEdit.emit();
    this.clearForm();
  }

  clearForm(): void {
    this.form.reset();
  }
}
