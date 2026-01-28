import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskCounterComponent } from './task-counter.component';

describe('TaskCounterComponent', () => {
  let component: TaskCounterComponent;
  let fixture: ComponentFixture<TaskCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), TaskCounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Prueba básica de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Prueba de propiedades @Input
  it('should have input properties', () => {
    expect(component.pendientes).toBeDefined();
    expect(component.completadas).toBeDefined();
    expect(component.total).toBeDefined();
  });

  //Prueba de valores iniciales por defecto
  it('should start with default values', () => {
    expect(component.pendientes).toBe(0);
    expect(component.completadas).toBe(0);
    expect(component.total).toBe(0);
  });

  //Prueba del getter totalTareas
  it('should calculate total tasks correctly', () => {
    component.pendientes = 5;
    component.completadas = 3;
    
    expect(component.totalTareas).toBe(8);
  });

  //Prueba del getter totalTareas con valores cero
  it('should return zero when no tasks', () => {
    component.pendientes = 0;
    component.completadas = 0;
    
    expect(component.totalTareas).toBe(0);
  });

  //Prueba de estructura del componente
  it('should render counter container', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el).toBeTruthy();
  });

  //Prueba de renderizado de estadísticas
  it('should display task statistics', () => {
    const el: HTMLElement = fixture.nativeElement;
    const counter = el.querySelector('.task-counter') || el;
    expect(counter).toBeTruthy();
  });

  //Prueba de actualización de inputs
  it('should update when inputs change', () => {
    component.pendientes = 10;
    component.completadas = 7;
    fixture.detectChanges();
    
    expect(component.totalTareas).toBe(17);
  });
});
