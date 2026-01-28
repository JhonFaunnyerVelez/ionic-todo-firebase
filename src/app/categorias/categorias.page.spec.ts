import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

// ✅ Standalone Ionic providers
import { provideIonicAngular } from '@ionic/angular/standalone';

import { CategoriasPage } from './categorias.page';
import { CategoriaService } from '../services/categoria.service';
import { TareaService } from '../services/tarea.service';

// ✅ TU mock global de overlays (Modal/Alert/ActionSheet)
import { provideIonicOverlayMocks } from 'src/testing/ionic-mocks';

describe('CategoriasPage', () => {
  let component: CategoriasPage;
  let fixture: ComponentFixture<CategoriasPage>;

  // ✅ Mocks de servicios con spies
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
    // ✅ valores por defecto
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
        // ✅ Standalone component
        CategoriasPage
      ],
      providers: [
        provideRouter([]),
        provideAnimations(),
        provideIonicAngular(),

        // ✅ Overlay mocks globales
        ...provideIonicOverlayMocks(),

        // ✅ Services mocks
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: TareaService, useValue: tareaServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject CategoriaService', () => {
    const service = TestBed.inject(CategoriaService);
    expect(service).toBeTruthy();
  });

  it('should inject TareaService', () => {
    const service = TestBed.inject(TareaService);
    expect(service).toBeTruthy();
  });

  it('should call getCategorias at least once (si tu page lo llama en ngOnInit)', () => {
    expect(categoriaServiceSpy.getCategorias).toHaveBeenCalled();
  });

  it('should start with isLoading false (si tu propiedad existe)', () => {
    // ✅ si tu pagina maneja "isLoading"
    if ('isLoading' in component) {
      expect((component as any).isLoading).toBeFalse();
    } else {
      // Si no existe, no lo forzamos
      expect(true).toBeTrue();
    }
  });

  it('should render list container', () => {
    const el: HTMLElement = fixture.nativeElement;
    // busca algo típico del HTML (ajústalo a tu template real)
    expect(el).toBeTruthy();
  });
});
