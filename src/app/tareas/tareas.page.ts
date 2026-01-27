import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { addOutline, trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonMenuButton]
})
export class TareasPage {
  tareas = [
    { id: 1, titulo: 'Revisar correos', completada: false, categoria: 'Trabajo' },
    { id: 2, titulo: 'Hacer ejercicio', completada: false, categoria: 'Personal' },
    { id: 3, titulo: 'Estudiar Angular', completada: true, categoria: 'Estudio' },
    { id: 4, titulo: 'Preparar presentación', completada: false, categoria: 'Trabajo' }
  ];

  constructor() {}

  toggleTarea(tarea: any) {
    tarea.completada = !tarea.completada;
  }
}
