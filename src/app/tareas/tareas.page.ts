import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonMenuButton, IonFab, IonFabButton, IonSpinner, ModalController, ActionSheetController, IonAvatar, IonToggle, AlertController, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent } from '@ionic/angular/standalone';
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
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonMenuButton, IonFab, IonFabButton, IonSpinner, IonAvatar, IonToggle, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent]
})
export class TareasPage implements OnInit, OnDestroy {
  tareas: Tarea[] = []; 
  categorias: Categoria[] = [];
  isLoading = false;
  private tareasSubscription: Subscription | null = null;
  private categoriasSubscription: Subscription | null = null;

  // Infinite scroll properties
  tareasMostradas: Tarea[] = [];
  limiteInicial = 20;
  limiteActual = 20;

  /**
   * Inyeccion de servicios
   */
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

  /**
   * Getters para obtener el número de tareas pendientes y completadas
   */
  get tareasPendientes(): number {
    return this.tareas.filter(tarea => !tarea.completa).length;
  }

  /**
   * Getters para obtener el número de tareas pendientes y completadas
   */
  get tareasCompletadas(): number {
    return this.tareas.filter(tarea => tarea.completa).length;
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
        
        // Actualizar tareas mostradas con límite
        this.actualizarTareasMostradas();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar tareas:', error);
        this.isLoading = false;
      }
    });
  }

  /** 
   * Metodo para actualizar las tareas mostradas
   */
  actualizarTareasMostradas() {
    this.tareasMostradas = this.tareas.slice(0, this.limiteActual);
  }

  /**
   * Metodo para cargar mas tareas
   */
  loadData(event: any) {
    // Incrementar límite y actualizar tareas mostradas
    this.limiteActual += 20;
    this.actualizarTareasMostradas();
    
    // Completar infinite scroll
    event.target.complete();
    
    // Deshabilitar si no hay más tareas
    if (this.tareasMostradas.length >= this.tareas.length) {
      event.target.disabled = true;
    }
  }

  ngOnDestroy() {
    if (this.tareasSubscription) {
      this.tareasSubscription.unsubscribe();
    }
    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
  }

  /**
   * Metodo para cambiar el estado de una tarea
   */
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

  /**
   * Metodo para eliminar una tarea
   */
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

/**
 * Metodo para abrir el formulario de tarea
 */
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
          // Usar los datos del formulario tal como vienen
          console.log('Datos del modal al crear tarea:', data);
          await this.tareaService.createTarea(data);
        }
      } catch (error) {
        console.error('Error al guardar tarea:', error);
      }
    }
  }

  /**
   * Metodo para abrir el action sheet
   */
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

  /** 
   *  Metodo para obtener el nombre de la categoria
   */
  getNombreCategoria(keyCategoriaID: string): string {
    const categoria = this.categorias.find(cat => cat.id === keyCategoriaID);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  /** 
   *  Metodo para formatear la fecha
   */
  formatDate(fecha: Date): string {
    const date = new Date(fecha);
    const hoy = new Date();
    const diffMs = hoy.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else if (diffDays < 30) {
      const semanas = Math.floor(diffDays / 7);
      return `Hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: date.getFullYear() !== hoy.getFullYear() ? 'numeric' : undefined 
      });
    }
  }
}
