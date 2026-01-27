import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonButtons, IonMenuButton, IonFab, IonFabButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonSpinner, ModalController, ActionSheetController } from '@ionic/angular/standalone';
import { addCircle, trash, create, closeOutline, pencil, chevronForward } from 'ionicons/icons';
import { CategoriaService, Categoria } from '../services/categoria.service';
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

  constructor(private categoriaService: CategoriaService, private modalController: ModalController, private actionSheetController: ActionSheetController) {
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
    this.categoriasSubscription = this.categoriaService.getCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías en tiempo real:', error);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.categoriasSubscription) {
      this.categoriasSubscription.unsubscribe();
    }
  }

  async deleteCategoria(id: string) {
    try {
      await this.categoriaService.deleteCategoria(id);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  }

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
            this.deleteCategoria(categoria.id);
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
