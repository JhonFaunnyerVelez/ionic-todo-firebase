import { Injectable } from '@angular/core';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../config/firebase.config';
import { Observable } from 'rxjs';
import { Tarea } from '../core/models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareasCollection = collection(firestore, 'tareas');

  constructor() {}

  getTareas(): Observable<Tarea[]> {
    return new Observable(observer => {
      const unsubscribe = onSnapshot(this.tareasCollection, (snapshot) => {
        const tareas = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Tarea));
        observer.next(tareas);
      }, (error) => {
        console.error('Error en tiempo real:', error);
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }

  async createTarea(tarea: Omit<Tarea, 'id'>): Promise<Tarea> {
    try {
      const docRef = await addDoc(this.tareasCollection, tarea);
      return {
        id: docRef.id,
        ...tarea
      };
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  }

  async updateTarea(id: string, tarea: Partial<Tarea>): Promise<void> {
    try {
      const docRef = doc(firestore, 'tareas', id);
      await updateDoc(docRef, tarea);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw error;
    }
  }

  async deleteTarea(id: string): Promise<void> {
    try {
      const docRef = doc(firestore, 'tareas', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }
  }

  async toggleCompletada(id: string, completa: boolean): Promise<void> {
    try {
      const docRef = doc(firestore, 'tareas', id);
      await updateDoc(docRef, { completa });
    } catch (error) {
      console.error('Error al cambiar estado de tarea:', error);
      throw error;
    }
  }
}
