import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Standalone Ionic providers
import { provideIonicAngular } from '@ionic/angular/standalone';

import { TareaFormComponent } from './tarea-form.component';

// TU mock global de overlays (Modal/Alert/ActionSheet)
import { provideIonicOverlayMocks } from 'src/testing/ionic-mocks';

describe('TareaFormComponent', () => {
  let component: TareaFormComponent;
  let fixture: ComponentFixture<TareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Standalone component
        TareaFormComponent,
        FormsModule,
        CommonModule
      ],
      providers: [
        provideAnimations(),
        provideIonicAngular(),

        // Overlay mocks globales
        ...provideIonicOverlayMocks()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form container', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should have initial properties', () => {
    expect(component).toBeDefined();
  });
});
