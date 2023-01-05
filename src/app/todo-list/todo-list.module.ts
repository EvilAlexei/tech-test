import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ItemCreateComponent } from '@components/item-create/item-create.component';
import { TodoItemComponent } from '@components/todo-item/todo-item.component';
import { FiltersComponent } from '@components/filters/filters.component';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    ItemCreateComponent,
    FiltersComponent,
  ],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TodoListModule {
}
