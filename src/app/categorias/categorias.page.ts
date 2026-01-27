import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonButtons, IonMenuButton, IonFab, IonFabButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonSpinner, ModalController, ActionSheetController, AlertController } from '@ionic/angular/standalone';
import { addCircle, trash, create, closeOutline, pencil, chevronForward } from 'ionicons/icons';
import { CategoriaService } from '../services/categoria.service';
import { TareaService } from '../services/tarea.service';
import { Categoria } from '../core/models/categoria.model';
import { Tarea } from '../core/models/tarea.model';
import { CategoriaFormComponent } from '../components/categoria-form/categoria-form.component';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonButtons, IonMenuButton, IonFab, IonFabButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonSpinner]
})
export class CategoriasPage implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  isLoading = false;
  private categoriasSubscription: Subscription | null = null;
  private tareasSubscription: Subscription | null = null;
  private tareas: Tarea[] = [];

  private categoriaService = inject(CategoriaService);
  private modalController = inject(ModalController);
  private actionSheetController = inject(ActionSheetController);
  private alertController = inject(AlertController);
  private tareaService = inject(TareaService);

  constructor() {
    addIcons({
      'add-circle': addCircle,
      'trash': trash,
      'create': create,
      'close-outline': closeOutline,
      'pencil': pencil,
      'chevron-forward': chevronForward
    });
  }

  async ngOnInit() {
    this.isLoading = true;
    
    // Cargar categorías
    this.categoriasSubscription = this.categoriaService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
        this.isLoading = false;
      }
    });

    // Cargar tareas para validación
    this.tareasSubscription = this.tareaService.getTareas().subscribe({
      next: (tareas: Tarea[]) => {
        this.tareas = tareas;
      },
      error: (error: any) => {
        console.error('Error al cargar tareas:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
    if (this.tareasSubscription) {
      this.tareasSubscription.unsubscribe();
    }
  }

  /***
   * Metodo para eliminar una categoria
   */
  async deleteCategoria(id: string) {
  // Verificar si la categoría está siendo usada en tareas
  const tareasUsandoCategoria = this.tareas.filter(tarea => tarea.keyCategoriaID === id);
  
  if (tareasUsandoCategoria.length > 0) {
    const alert = await this.alertController.create({
      header: 'No se puede eliminar',
      message: `Esta categoría está siendo usada en ${tareasUsandoCategoria.length} tarea(s). Debe eliminar o reasignar las tareas primero.`,
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
    return;
  }

  // Si no está en uso, mostrar confirmación de eliminación
  const alert = await this.alertController.create({
    header: 'Confirmar Eliminación',
    message: '¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.',
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
            await this.categoriaService.deleteCategoria(id);
          } catch (error) {
            console.error('Error al eliminar categoría:', error);
          }
        }
      }
    ]
  });

  await alert.present();
}

/**
 * Metodo para abrir el modal de la categoria
 * @param categoria 
 */
  async openCategoriaForm(categoria?: Categoria) {
    const modal = await this.modalController.create({
      component: CategoriaFormComponent,
      componentProps: {
        categoria: categoria || {},
        isModal: true
      }
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'save' && data) {
      try {
        if (categoria?.id) {
          await this.categoriaService.updateCategoria(categoria.id, data);
        } else {
          await this.categoriaService.createCategoria(data);
        }
      } catch (error) {
        console.error('Error al guardar categoría:', error);
      }
    }
  }

  /**
   * Metodo para mostrar el action sheet de la categoria
   * @param categoria 
   */
  async presentActionSheet(categoria: Categoria) {
    const actionSheet = await this.actionSheetController.create({
      header: categoria.nombre,
      buttons: [
        {
          text: 'Editar',
          icon: 'pencil',
          handler: () => {
            this.openCategoriaForm(categoria);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteCategoria(categoria.id!);
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
}
