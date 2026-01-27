import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonMenuButton, IonFab, IonFabButton, IonSpinner, ModalController, ActionSheetController, IonAvatar, IonToggle, AlertController } from '@ionic/angular/standalone';
import { addCircle, trash, create, closeOutline, pencil, checkmark, chevronForward, checkmarkCircle, ellipse } from 'ionicons/icons';
import { TareaService } from '../services/tarea.service';
import { CategoriaService } from '../services/categoria.service';
import { Tarea } from '../core/models/tarea.model';
import { Categoria } from '../core/models/categoria.model';
import { TareaFormComponent } from '../components/tarea-form/tarea-form.component';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonMenuButton, IonFab, IonFabButton, IonSpinner, IonAvatar, IonToggle]
})
export class TareasPage implements OnInit, OnDestroy {
  tareas: Tarea[] = []; 
  categorias: Categoria[] = [];
  isLoading = false;
  private tareasSubscription: Subscription | null = null;
  private categoriasSubscription: Subscription | null = null;

  private tareaService = inject(TareaService);
  private categoriaService = inject(CategoriaService);
  private modalController = inject(ModalController);
  private actionSheetController = inject(ActionSheetController);
  private alertController = inject(AlertController);

  constructor() {
    addIcons({
      'add-circle': addCircle,
      'trash': trash,
      'create': create,
      'close-outline': closeOutline,
      'pencil': pencil,
      'checkmark': checkmark,
      'chevron-forward': chevronForward,
      'checkmark-circle': checkmarkCircle,
      'ellipse': ellipse
    });
  }

  async ngOnInit() {
    this.isLoading = true;
    
    // Cargar categorías primero
    this.categoriasSubscription = this.categoriaService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
      }
    });

    // Cargar tareas
    this.tareasSubscription = this.tareaService.getTareas().subscribe({
      next: (tareas: Tarea[]) => {
        this.tareas = tareas.map(tarea => ({
          ...tarea,
          categoria: this.categorias.find(cat => cat.id === tarea.keyCategoriaID)
        }));
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar tareas:', error);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.tareasSubscription) {
      this.tareasSubscription.unsubscribe();
    }
    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
  }

  async toggleTarea(tarea: Tarea) {
    try {
      // Invertir el estado localmente para respuesta inmediata
      const nuevoEstado = !tarea.completa;
      
      // Actualizar en Firebase
      await this.tareaService.toggleCompletada(tarea.id, nuevoEstado);
      
      // El estado se actualizará automáticamente por el real-time subscription
    } catch (error) {
      console.error('Error al cambiar estado de tarea:', error);
    }
  }

  async deleteTarea(id: string) {
  const alert = await this.alertController.create({
    header: 'Confirmar Eliminación',
    message: '¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: async () => {
          try {
            await this.tareaService.deleteTarea(id);
          } catch (error) {
            console.error('Error al eliminar tarea:', error);
          }
        }
      }
    ]
  });

  await alert.present();
}

  async openTareaForm(tarea?: Tarea) {
    const modal = await this.modalController.create({
      component: TareaFormComponent,
      componentProps: {
        tarea: tarea || { descripcion: '', keyCategoriaID: '', completa: false },
        categorias: this.categorias,
        isModal: true
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save' && data) {
      try {
        if (tarea?.id) {
          await this.tareaService.updateTarea(tarea.id, data);
        } else {
          // Asegurar que completa sea false por defecto al crear
          const nuevaTarea = { ...data, completa: false };
          await this.tareaService.createTarea(nuevaTarea);
        }
      } catch (error) {
        console.error('Error al guardar tarea:', error);
      }
    }
  }

  async presentActionSheet(tarea: Tarea) {
    const actionSheet = await this.actionSheetController.create({
      header: tarea.descripcion.substring(0, 30) + '...',
      buttons: [
        {
          text: tarea.completa ? 'Marcar como pendiente' : 'Marcar como completada',
          icon: 'checkmark',
          handler: () => {
            this.toggleTarea(tarea);
          }
        },
        {
          text: 'Editar',
          icon: 'pencil',
          handler: () => {
            this.openTareaForm(tarea);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteTarea(tarea.id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close-outline'
        }
      ]
    });

    await actionSheet.present();
  }

  getNombreCategoria(keyCategoriaID: string): string {
    const categoria = this.categorias.find(cat => cat.id === keyCategoriaID);
    return categoria ? categoria.nombre : 'Sin categoría';
  }
}
