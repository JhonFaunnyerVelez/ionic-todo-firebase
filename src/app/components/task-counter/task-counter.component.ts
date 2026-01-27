import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-counter',
  templateUrl: './task-counter.component.html',
  styleUrls: ['./task-counter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent]
})
export class TaskCounterComponent {
  @Input() pendientes: number = 0;
  @Input() completadas: number = 0;
  @Input() total: number = 0;

  get totalTareas(): number {
    return this.pendientes + this.completadas;
  }
}
