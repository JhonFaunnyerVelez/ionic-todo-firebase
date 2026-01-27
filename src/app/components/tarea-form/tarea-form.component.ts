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
  IonTextarea,
  IonButton,
  IonButtons,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  ModalController
} from '@ionic/angular/standalone';
import { closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Tarea } from 'src/app/core/models/tarea.model';
import { Categoria } from 'src/app/core/models/categoria.model';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.scss'],
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
    IonTextarea,
    IonButton,
    IonButtons,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonCheckbox
  ]
})
export class TareaFormComponent {
  @Input() tarea: Partial<Tarea> = {};
  @Input() categorias: Categoria[] = [];
  @Input() isModal = false;
  @Output() save = new EventEmitter<Partial<Tarea>>();
  @Output() cancel = new EventEmitter<void>();

  descripcion: string = '';
  keyCategoriaID: string = '';
  completa: boolean = false;

  constructor(private modalController: ModalController) {
    addIcons({
      'close-outline': closeOutline
    });
  }

  ngOnInit() {
    if (this.tarea) {
      this.descripcion = this.tarea.descripcion || '';
      this.keyCategoriaID = this.tarea.keyCategoriaID || '';
      this.completa = this.tarea.completa || false;
    }
  }

  onSave() {
    if (!this.descripcion.trim() || !this.keyCategoriaID) {
      return;
    }

    const tareaData: Partial<Tarea> = {
      descripcion: this.descripcion.trim(),
      keyCategoriaID: this.keyCategoriaID,
      completa: this.completa || false // Asegurar que sea false por defecto
    };

    this.modalController.dismiss(tareaData, 'save');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
