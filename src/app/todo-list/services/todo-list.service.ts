import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Todo } from '@models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private url = 'http://localhost:3000/tasks';

  private todoListSubject = new Subject<Todo[]>();
  todoList$: Observable<Todo[]> = this.todoListSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  getItems(): void {
    this.http.get<Todo[]>(this.url).subscribe(data => this.todoListSubject.next(data));
  }

  addItem(item: Todo): void {
    this.http.post(this.url, item).subscribe(() => this.getItems());
  }

  updateItem(item: Partial<Todo>): void {
    this.http.patch(`${this.url}/${item.id}`, item).subscribe(() => this.getItems());
  }

  deleteItem(itemId: number): void {
    this.http.delete(`${this.url}/${itemId}`).subscribe(() => this.getItems());
  }
}
