import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filters } from '@models/filters.model';
import { TodoStatus } from '@models/todo-status.enum';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let nativeElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filters', () => {
    const updateEvent = spyOn(component.updateFilters, 'emit');

    const button = nativeElement.querySelector(`button[data-test=${TodoStatus.ACTIVE}]`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(updateEvent).toHaveBeenCalled();
  });

  it('status filters should be changed', () => {
    const filters: Filters = new Filters();
    const newFilters: Filters = {
      todoStatus: TodoStatus.ACTIVE,
      category: '',
    };

    expect({...component.filters}).toEqual({...filters});

    const button = nativeElement.querySelector(`button[data-test=${TodoStatus.ACTIVE}]`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect({...component.filters}).toEqual({...newFilters});
  });

  it('should clear filters to default state', () => {
    const filters: Filters = new Filters();
    const newFilters: Filters = {
      todoStatus: TodoStatus.ACTIVE,
      category: '',
    };

    expect({...component.filters}).toEqual({...filters});

    const button = nativeElement.querySelector(`button[data-test=${TodoStatus.ACTIVE}]`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect({...component.filters}).toEqual({...newFilters});

    const clearButton = nativeElement.querySelector(`.clear-filters`);
    clearButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect({...component.filters}).toEqual({...filters});
  });
});
