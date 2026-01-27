import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonTextarea,
  IonButton,
  IonButtons,
  IonIcon,
  ModalController
} from '@ionic/angular/standalone';
import { closeOutline } from 'ionicons/icons';
import { Categoria } from '../../services/categoria.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonButtons,
    IonIcon
  ]
})
export class CategoriaFormComponent {
  @Input() categoria: Partial<Categoria> = {};
  @Input() isModal = false;
  @Output() save = new EventEmitter<Partial<Categoria>>();
  @Output() cancel = new EventEmitter<void>();

  nombre: string = '';
  descripcion: string = '';

  constructor(private modalController: ModalController) {
    addIcons({
      'close-outline': closeOutline
    });
  }

  ngOnInit() {
    if (this.categoria) {
      this.nombre = this.categoria.nombre || '';
      this.descripcion = this.categoria.descripcion || '';
    }
  }

  onSave() {
    if (!this.nombre.trim()) {
      return;
    }

    const categoriaData: Partial<Categoria> = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim()
    };

    this.modalController.dismiss(categoriaData, 'save');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
