
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { folderOutline, folderSharp, listOutline, listSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton],
})
export class AppComponent {
  public appPages = [
    { title: 'Categorías', url: '/categorias', icon: 'folder' },
    { title: 'Tareas', url: '/tareas', icon: 'list' },
  ];
  public labels = [];
  
  private menuController = inject(MenuController);

  constructor() {
    addIcons({ folderOutline, folderSharp, listOutline, listSharp });
  }

  async closeMenu() {
    await this.menuController.close();
  }
}
