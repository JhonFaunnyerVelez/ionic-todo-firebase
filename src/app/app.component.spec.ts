import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  //Prueba básica de creación del componente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //Prueba de etiquetas del menú (sin iconos)
  it('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(4);
    expect(menuItems[0].textContent).toContain('Categorías');
    expect(menuItems[1].textContent).toContain('Tareas');
  });

  //Prueba de elementos del menú (sin iconos)
  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(4);
    expect(menuItems[0]).toBeTruthy();
    expect(menuItems[1]).toBeTruthy();
  });

  //Prueba de propiedades del componente
  it('should have appPages property', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appPages).toBeDefined();
    expect(app.appPages.length).toBeGreaterThan(0);
  });

  //Prueba de estructura del menú
  it('should have menu structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menu = app.querySelector('ion-menu');
    expect(menu).toBeTruthy();
  });
});
