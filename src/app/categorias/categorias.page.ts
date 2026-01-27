import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonButtons, IonMenuButton]
})
export class CategoriasPage {
  categorias = [
    { id: 1, nombre: 'Trabajo', descripcion: 'Tareas relacionadas con el trabajo' },
    { id: 2, nombre: 'Personal', descripcion: 'Actividades personales' },
    { id: 3, nombre: 'Estudio', descripcion: 'Tareas de estudio y aprendizaje' }
  ];

  constructor() {}
}
