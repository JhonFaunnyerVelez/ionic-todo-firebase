import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

// Standalone Ionic providers
import { provideIonicAngular } from '@ionic/angular/standalone';

import { TareasPage } from './tareas.page';
import { CategoriaService } from '../services/categoria.service';
import { TareaService } from '../services/tarea.service';
import { TaskCounterComponent } from '../components/task-counter/task-counter.component';

// mock global de overlays (Modal/Alert/ActionSheet)
import { provideIonicOverlayMocks } from 'src/testing/ionic-mocks';

describe('TareasPage', () => {
  let component: TareasPage;
  let fixture: ComponentFixture<TareasPage>;

  // Mocks de servicios con spies
  const categoriaServiceSpy = jasmine.createSpyObj<CategoriaService>('CategoriaService', [
    'getCategorias',
    'createCategoria',
    'updateCategoria',
    'deleteCategoria'
  ]);

  const tareaServiceSpy = jasmine.createSpyObj<TareaService>('TareaService', [
    'getTareas',
    'createTarea',
    'updateTarea',
    'deleteTarea'
  ]);

  beforeEach(async () => {
    // valores por defecto
    categoriaServiceSpy.getCategorias.and.returnValue(of([]));
    categoriaServiceSpy.createCategoria.and.resolveTo();
    categoriaServiceSpy.updateCategoria.and.resolveTo();
    categoriaServiceSpy.deleteCategoria.and.resolveTo();

    tareaServiceSpy.getTareas.and.returnValue(of([]));
    tareaServiceSpy.createTarea.and.resolveTo();
    tareaServiceSpy.updateTarea.and.resolveTo();
    tareaServiceSpy.deleteTarea.and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [
        // Standalone components
        TareasPage,
        TaskCounterComponent,
        FormsModule
      ],
      providers: [
        provideRouter([]),
        provideAnimations(),
        provideIonicAngular(),

        // Overlay mocks globales
        ...provideIonicOverlayMocks(),

        // Services mocks
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: TareaService, useValue: tareaServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component.tareas).toEqual([]);
    expect(component.categorias).toEqual([]);
    expect(component.isLoading).toBeFalse();
  });

  it('should inject CategoriaService', () => {
    const service = TestBed.inject(CategoriaService);
    expect(service).toBeTruthy();
  });

  it('should inject TareaService', () => {
    const service = TestBed.inject(TareaService);
    expect(service).toBeTruthy();
  });

  it('should call getTareas at least once', () => {
    expect(tareaServiceSpy.getTareas).toHaveBeenCalled();
  });

  it('should call getCategorias at least once', () => {
    expect(categoriaServiceSpy.getCategorias).toHaveBeenCalled();
  });

  it('should render list container', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el).toBeTruthy();
  });
});
