import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Todo } from '@models/todo.model';
import { tasksMock } from 'src/app/todo-list/mocks/tasks.mock';
import { TodoListService } from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpController: HttpTestingController;

  const url = 'http://localhost:3000/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodoListService);
  });

  it('should get tasks', () => {
    service.getItems();
    service.todoList$.subscribe(data => {
      expect(data).toEqual(tasksMock);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url,
    });

    req.flush(tasksMock);
  });
});
